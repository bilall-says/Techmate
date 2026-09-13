import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const PORT = 3000;

// Lazy initialization for GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      hasGeminiKey: Boolean(
        process.env.GEMINI_API_KEY &&
          process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"
      ),
    });
  });

  // Chat endpoint powered by Gemini API with multi-turn conversation support
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [], isUrdu = false } = req.body;

      if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({
          success: false,
          fallback: true,
          error: "Message is required",
        });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Missing or placeholder API key -> trigger graceful fallback to local knowledge base
        return res.json({
          success: false,
          fallback: true,
          reason: "GEMINI_API_KEY is not configured",
        });
      }

      // Build sanitized multi-turn message history for Gemini SDK:
      // 1. Multi-turn must begin with a user turn (discard leading model greetings).
      // 2. Roles must strictly alternate (collapse consecutive messages with same role).
      // 3. Final turn must be the current user message.
      const rawTurns: Array<{ role: "user" | "model"; text: string }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-8)) {
          if (
            item &&
            typeof item.text === "string" &&
            item.text.trim() &&
            (item.role === "user" || item.role === "model")
          ) {
            rawTurns.push({
              role: item.role,
              text: item.text.trim(),
            });
          }
        }
      }

      // Add current user message
      rawTurns.push({
        role: "user",
        text: message.trim(),
      });

      // Normalize turns to strictly alternate starting with 'user'
      const normalizedTurns: Array<{ role: "user" | "model"; text: string }> = [];
      for (const turn of rawTurns) {
        if (normalizedTurns.length === 0) {
          if (turn.role === "user") {
            normalizedTurns.push({ role: turn.role, text: turn.text });
          }
        } else {
          const prev = normalizedTurns[normalizedTurns.length - 1];
          if (prev.role === turn.role) {
            prev.text = `${prev.text}\n${turn.text}`;
          } else {
            normalizedTurns.push({ role: turn.role, text: turn.text });
          }
        }
      }

      // Ensure at least the current user turn is present and ends with user
      if (
        normalizedTurns.length === 0 ||
        normalizedTurns[normalizedTurns.length - 1].role !== "user"
      ) {
        normalizedTurns.push({ role: "user", text: message.trim() });
      }

      const contents = normalizedTurns.map((turn) => ({
        role: turn.role,
        parts: [{ text: turn.text }],
      }));

      const systemInstruction = `You are TechMate AI, the official intelligent digital assistant for TECHMATE — a premier software house.
Taglines:
- "Building Software. Creating Possibilities."
- "Turning Ideas Into Digital Reality."

Company Overview & Capabilities:
- Full-stack Custom Software Development (SaaS, enterprise portals, workflow automation)
- High-performance Web Applications (React, Next.js, Tailwind CSS, TypeScript)
- Mobile Apps (iOS & Android via Flutter & React Native)
- UI/UX Product Design (Human-centered design systems, Figma, WCAG 2.1 AA accessible)
- Scalable Cloud Backends & APIs (Node.js, Express, Python, PostgreSQL, REST, GraphQL)
- AI & Automation Solutions (Smart chatbots, workflows, machine intelligence)
- Regional & Global Delivery: Serving clients in Pakistan (with transparent PKR pricing/milestones) and internationally across USA, UK, UAE, and Europe.
- Contact Channels: WhatsApp (+92 3224787839), Email (sheikhbilal04888@gmail.com), or booking an Architecture Call.

Behavioral Guidelines:
1. Tone: Friendly, modern, professional, visionary, concise, and helpful.
2. Language: Respond fluently in ${isUrdu ? "Urdu (اردو)" : "English (or Urdu if the user specifically communicates in Urdu)"}.
3. Formatting: Format clear, readable answers with short paragraphs or clean bullet points when explaining features or services.
4. Output Schema: You MUST respond in JSON adhering to the specified schema:
   - "reply": The conversational response to the user.
   - "expression": Visual avatar mood matching the response ("happy", "thinking", "excited", or "helping").
   - "suggestedActions": Array of 2 to 3 concise, highly relevant follow-up action buttons (e.g. "🚀 Start Project Brief", "💬 Chat on WhatsApp", "📱 View Mobile Services", "💰 Inquire Pricing").
   - "showProjectForm": Boolean. Set to true ONLY if the user explicitly asks to start a project, hire TECHMATE, get a quote/estimate, or submit project specifications. Otherwise false.`;

      // Candidate models in priority order to handle temporary 503 high-demand or rate limits
      const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-3.5-flash"];
      let response: any = null;
      let lastError: any = null;

      for (const model of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.7,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  reply: {
                    type: Type.STRING,
                    description: "The AI assistant response message for the user.",
                  },
                  expression: {
                    type: Type.STRING,
                    enum: ["happy", "thinking", "excited", "helping"],
                    description: "The visual avatar mood expression.",
                  },
                  suggestedActions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 to 3 relevant follow-up action options.",
                  },
                  showProjectForm: {
                    type: Type.BOOLEAN,
                    description: "Whether to display the project inquiry mini-form.",
                  },
                },
                required: ["reply", "expression"],
              },
            },
          });

          if (response && response.text) {
            break; // Succeeded!
          }
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${model} unavailable (${err?.status || err?.message}), attempting alternative model...`);
        }
      }

      if (!response || !response.text) {
        // Final resilient retry: single-turn prompt on the fast model
        try {
          response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [{ role: "user", parts: [{ text: message.trim() }] }],
            config: {
              systemInstruction,
              temperature: 0.7,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  reply: {
                    type: Type.STRING,
                    description: "The AI assistant response message for the user.",
                  },
                  expression: {
                    type: Type.STRING,
                    enum: ["happy", "thinking", "excited", "helping"],
                    description: "The visual avatar mood expression.",
                  },
                  suggestedActions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 to 3 relevant follow-up action options.",
                  },
                  showProjectForm: {
                    type: Type.BOOLEAN,
                    description: "Whether to display the project inquiry mini-form.",
                  },
                },
                required: ["reply", "expression"],
              },
            },
          });
        } catch (_) {}
      }

      if (!response || !response.text) {
        return res.json({
          success: false,
          fallback: true,
          error: lastError?.message || "Gemini models currently unavailable",
        });
      }

      const responseText = response.text || "";
      let parsed: {
        reply?: string;
        expression?: "happy" | "thinking" | "excited" | "helping";
        suggestedActions?: string[];
        showProjectForm?: boolean;
      } = {};

      try {
        parsed = JSON.parse(responseText.trim());
      } catch {
        parsed = {
          reply: responseText,
          expression: "helping",
          suggestedActions: [
            "💬 Chat on WhatsApp",
            "🚀 Start a Project",
            "📅 Book Architecture Call",
          ],
          showProjectForm: false,
        };
      }

      return res.json({
        success: true,
        fallback: false,
        reply: parsed.reply || responseText,
        expression: parsed.expression || "happy",
        suggestedActions:
          Array.isArray(parsed.suggestedActions) && parsed.suggestedActions.length > 0
            ? parsed.suggestedActions
            : ["💬 Chat on WhatsApp", "🚀 Start a Project", "🌐 Explore Services"],
        showProjectForm: Boolean(parsed.showProjectForm),
      });
    } catch (error: any) {
      console.warn("Gemini API generation failed, signaling fallback:", error?.message || error);
      return res.json({
        success: false,
        fallback: true,
        error: error?.message || "Gemini API request failed",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
