export interface QuickAction {
  id: string;
  label: string;
  query: string;
  iconName: string;
}

export const quickActions: QuickAction[] = [
  { id: 'web', label: 'Build a Website', query: 'I need a website for my business', iconName: 'Globe' },
  { id: 'app', label: 'Create an App', query: 'I want to build a mobile application', iconName: 'Smartphone' },
  { id: 'software', label: 'Custom Software', query: 'Tell me about custom software development', iconName: 'Code2' },
  { id: 'uiux', label: 'UI/UX Design', query: 'Can you help with UI/UX product design?', iconName: 'Palette' },
  { id: 'ai', label: 'AI Solutions', query: 'What AI and smart solutions do you build?', iconName: 'Bot' },
  { id: 'team', label: 'Talk to Our Team', query: 'How can I contact the TECHMATE team?', iconName: 'Users' },
];

export interface ProjectInquiryData {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  description: string;
  budget?: string;
  ndaRequired: boolean;
}

export interface AiResponseResult {
  reply: string;
  expression: 'happy' | 'thinking' | 'excited' | 'helping';
  showProjectForm?: boolean;
  suggestedActions?: string[];
  serviceContext?: string;
}

/**
 * Intelligent domain-specific response engine for TechMate AI
 * Answers questions specifically about TECHMATE, engineering practices, pricing, and project initiation.
 */
export function getTechmateAiResponse(userMessage: string, isUrdu: boolean = false): AiResponseResult {
  const query = userMessage.toLowerCase().trim();

  // 1. PROJECT INQUIRY / START PROJECT / QUOTE / ESTIMATE / HIRING INTENT
  if (
    query.includes('start project') ||
    query.includes('hire') ||
    query.includes('get started') ||
    query.includes('quote') ||
    query.includes('estimate') ||
    query.includes('proposal') ||
    query.includes('brief') ||
    query.includes('order') ||
    query.includes('need a project') ||
    (query.includes('build') && (query.includes('my') || query.includes('for us') || query.includes('cost')))
  ) {
    return {
      reply: isUrdu
        ? "بہترین! آئیے آپ کے پراجیکٹ کا آغاز کرتے ہیں۔ براہ کرم نیچے دیئے گئے فارم میں مختصر تفصیلات فراہم کریں تاکہ ہماری انجینئرنگ ٹیم مکمل بجٹ اور لائحہ عمل تیار کر سکے۔"
        : "Great! Let's get your project started. Fill in a few quick details below so our solutions architects can analyze your requirements and provide a milestone roadmap.",
      expression: 'excited',
      showProjectForm: true,
      suggestedActions: ['Start Project Mini-Form', '💬 Chat on WhatsApp (+92 3224787839)', '📅 Book Architecture Call'],
    };
  }

  // 2. WHAT TECHMATE DOES / COMPANY OVERVIEW
  if (
    query.includes('what does techmate do') ||
    query.includes('what is techmate') ||
    query.includes('who are you') ||
    query.includes('about techmate') ||
    query.includes('company profile') ||
    query.includes('services overview')
  ) {
    return {
      reply: isUrdu
        ? "TECHMATE پاکستان اور عالمی سطح پر ایک جدید سافٹ ویئر ہاؤس ہے جو جدید خیالات کو ڈیجیٹل مصنوعات میں تبدیل کرتا ہے۔ ہم کسٹم سافٹ ویئر، ویب و موبائل ایپلی کیشنز، UI/UX ڈیزائن، کلاؤڈ سسٹمز، اور AI پاورڈ حل فراہم کرتے ہیں۔"
        : "TECHMATE is a premier software house that transforms ideas into digital products. We specialize in custom software, web and mobile development, UI/UX design, cloud infrastructure, and AI-powered solutions. Our mission: 'Building Software. Creating Possibilities.'",
      expression: 'happy',
      suggestedActions: ['🚀 Start a Project', '🌐 Web Development', '📱 Mobile Apps', '🤖 AI Solutions'],
    };
  }

  // 3. WEBSITE / WEB DEVELOPMENT
  if (
    query.includes('website') ||
    query.includes('web dev') ||
    query.includes('next.js') ||
    query.includes('react') ||
    query.includes('frontend') ||
    query.includes('full-stack') ||
    query.includes('portal')
  ) {
    return {
      reply: isUrdu
        ? "بالکل! TECHMATE آپ کے کاروباری اہداف کے مطابق جدید، رسپانسو، اور تیز رفتار ویب سائٹس اور پورٹلز تیار کرتا ہے (Next.js، React، اور Tailwind کے ساتھ)۔ کیا آپ اپنے ویب پراجیکٹ کے بارے میں کچھ مزید بتانا چاہیں گے؟"
        : "Absolutely. TECHMATE designs and develops modern, responsive websites and enterprise portals tailored to your goals. We build high-performance web applications using React, Next.js, TypeScript, and modern headless architectures. Would you like to tell me about your project?",
      expression: 'helping',
      suggestedActions: ['📝 Start Web Project', '💰 Web Pricing in PKR', '🔍 View Web Case Studies'],
      serviceContext: 'Web Development',
    };
  }

  // 4. MOBILE APP DEVELOPMENT
  if (
    query.includes('app') ||
    query.includes('mobile') ||
    query.includes('ios') ||
    query.includes('android') ||
    query.includes('flutter') ||
    query.includes('react native')
  ) {
    return {
      reply: isUrdu
        ? "ہم اس میں آپ کی مکمل رہنمائی اور تیاری کر سکتے ہیں۔ TECHMATE فلوٹر اور ری ایکٹ نیٹو کے ساتھ 60fps کی رفتار پر کام کرنے والی آئی او ایس اور اینڈرائیڈ ایپس بناتا ہے جس میں آف لائن سپورٹ اور ریئل ٹائم کلاؤڈ سسٹمز شامل ہیں۔ آپ کس قسم کی ایپ بنانا چاہتے ہیں؟"
        : "We can help with that. TECHMATE develops modern mobile applications focused on performance, usability, and scalability for iOS and Android using Flutter and React Native. Tell me what kind of app you have in mind.",
      expression: 'helping',
      suggestedActions: ['📱 Start Mobile Project', '💰 App Budget Breakdown', '⚡ Cross-Platform Features'],
      serviceContext: 'Mobile App Development',
    };
  }

  // 5. CUSTOM SOFTWARE & APIS
  if (
    query.includes('custom software') ||
    query.includes('backend') ||
    query.includes('api') ||
    query.includes('microservice') ||
    query.includes('erp') ||
    query.includes('saas') ||
    query.includes('database')
  ) {
    return {
      reply: isUrdu
        ? "TECHMATE پیچیدہ کاروباری عمل کو خودکار بنانے کے لیے حسبِ ضرورت (Custom) انٹرپرائز سسٹمز اور مائیکروسروسز تیار کرتا ہے۔ ہم Node.js، Python، PostgreSQL، اور کلاؤڈ سرورز پر قابل اعتماد سسٹمز بناتے ہیں۔"
        : "TECHMATE engineers bespoke enterprise software architectures, multi-tenant SaaS platforms, and high-throughput APIs in Node.js, Python, Go, and PostgreSQL designed for resilience and infinite scale.",
      expression: 'helping',
      suggestedActions: ['💻 Start Custom Software Brief', '🔒 NDA & Security', '💰 Enterprise Pricing'],
      serviceContext: 'Custom Software Development',
    };
  }

  // 6. UI/UX PRODUCT DESIGN
  if (
    query.includes('ui') ||
    query.includes('ux') ||
    query.includes('design') ||
    query.includes('figma') ||
    query.includes('prototype') ||
    query.includes('wireframe')
  ) {
    return {
      reply: isUrdu
        ? "ہماری UI/UX ڈیزائن ٹیم پروڈکٹ کی خوبصورتی، سہولت اور برانڈ شناخت کا بے مثال امتزاج تیار کرتی ہے۔ ہم مکمل ڈیزائن سسٹمز، وائر فریمز، اور انٹرایکٹو فیگما پروٹوٹائپس فراہم کرتے ہیں۔"
        : "Our UI/UX team delivers human-centered digital experiences that harmonize clean aesthetics and measurable user retention. We build complete Figma design systems, wireframes, and interactive prototypes adhering to WCAG accessibility standards.",
      expression: 'happy',
      suggestedActions: ['🎨 Request Design Audit', '📝 Start UI/UX Project', '📱 View Design Demos'],
      serviceContext: 'UI/UX Design',
    };
  }

  // 7. AI & SMART SOLUTIONS
  if (
    query.includes('ai') ||
    query.includes('artificial intelligence') ||
    query.includes('machine learning') ||
    query.includes('llm') ||
    query.includes('agent') ||
    query.includes('gemini') ||
    query.includes('chatbot')
  ) {
    return {
      reply: isUrdu
        ? "TECHMATE کسٹم AI سسٹمز، سمارٹ ایجنٹس، ایل ایل ایم انٹیگریشنز (جیسے Gemini)، اور خودکار ورک فلو انجینئر کرتا ہے۔ میں خود (TechMate AI) اسی برانڈ کی ڈیجیٹل ذہانت کا حصہ ہوں!"
        : "TECHMATE builds proprietary AI agents, custom LLM integrations (including Google Gemini), intelligent process automation, and vector search engines. In fact, I am TechMate AI, the official digital assistant crafted for this platform!",
      expression: 'excited',
      suggestedActions: ['🤖 Deploy AI Agent', '💡 AI Feasibility Review', '🚀 Start AI Project'],
      serviceContext: 'AI & Smart Solutions',
    };
  }

  // 8. CONTACT & REACHING THE TEAM
  if (
    query.includes('contact') ||
    query.includes('reach') ||
    query.includes('email') ||
    query.includes('address') ||
    query.includes('office') ||
    query.includes('call') ||
    query.includes('phone') ||
    query.includes('whatsapp')
  ) {
    return {
      reply: isUrdu
        ? "آپ TECHMATE ٹیم سے اس ویب سائٹ کے رابطہ سیکشن کے ذریعے رابطہ کر سکتے ہیں، یا نیچے دیئے گئے بٹن کے ذریعے پراجیکٹ کنسلٹیشن شروع کر سکتے ہیں۔ براہ راست واٹس ایپ: +92 3224787839، ای میل: sheikhbilal04888@gmail.com"
        : "You can contact the TECHMATE team through the Contact section of this website or start a project consultation right from the button below. You can also message our engineering desk directly on WhatsApp at +92 3224787839 or email sheikhbilal04888@gmail.com.",
      expression: 'happy',
      suggestedActions: ['📝 Start Project Form', '💬 Open WhatsApp (+92 3224787839)', '📍 View Pakistan Offices'],
    };
  }

  // 9. DEVELOPMENT PROCESS & METHODOLOGY
  if (
    query.includes('process') ||
    query.includes('methodology') ||
    query.includes('agile') ||
    query.includes('sprint') ||
    query.includes('timeline') ||
    query.includes('how do you work')
  ) {
    return {
      reply: isUrdu
        ? "ہمارا طریقہ کار 5 مراحل پر مشتمل ہے: 1. ڈسکوری اور تقاضوں کا تجزیہ 2. UI/UX ڈیزائن اور پروٹو ٹائپ 3. 2 ہفتوں کے ایجائل اسپرنٹس اور لائیو ڈیمو 4. کوالٹی ایشورنس اور سیکیورٹی ٹیسٹنگ 5. کلاؤڈ لانچ اور مسلسل مینٹیننس۔"
        : "Our 5-stage development process guarantees transparency: 1. Discovery & Architecture Blueprint 2. UI/UX Wireframing & Interactive Prototype 3. 2-Week Agile Sprints with bi-weekly demo builds 4. Rigorous QA & Security Testing 5. Production Cloud Launch with SLA support.",
      expression: 'helping',
      suggestedActions: ['⚡ 2-Week Sprint Details', '📝 Start Project Consultation', '👥 Meet the Team'],
    };
  }

  // 10. PRICING, BUDGET & PAYMENT TERMS
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('budget') ||
    query.includes('pkr') ||
    query.includes('rate') ||
    query.includes('how much') ||
    query.includes('payment')
  ) {
    return {
      reply: isUrdu
        ? "ہم پاکستانی روپے (PKR) اور غیر ملکی کرنسی (USD) میں سنگ میل پر مبنی (Milestone-based) شفاف فیس پیش کرتے ہیں۔ تیز رفتار MVPs عام طور پر 50 ہزار سے 1.5 لاکھ PKR، کسٹم پورٹلز 1.5 سے 4 لاکھ PKR، اور بڑے سسٹمز 4 لاکھ+ PKR سے شروع ہوتے ہیں۔ کیا آپ تخمینہ چاہیں گے؟"
        : "We operate on transparent, milestone-based pricing in Pakistani Rupees (PKR) and USD for global clients: Rapid MVPs start around PKR 50k–150k, custom platforms range PKR 150k–400k, and enterprise systems scale from PKR 400k+. Payments are tied to verified deliverables.",
      expression: 'happy',
      suggestedActions: ['💰 Request PKR Estimate', '📝 Start Project Mini-Form', '📞 Talk on WhatsApp'],
    };
  }

  // 11. NDA, CODE OWNERSHIP & IP
  if (
    query.includes('nda') ||
    query.includes('ip') ||
    query.includes('source code') ||
    query.includes('ownership') ||
    query.includes('contract') ||
    query.includes('security')
  ) {
    return {
      reply: isUrdu
        ? "آپ کو مکمل 100٪ دانشورانہ ملکیت (Intellectual Property) اور سورس کوڈ کے حقوق منتقل کیے جاتے ہیں۔ ہم کسی بھی تفصیلی گفتگو سے پہلے باہمی رازداری کا معاہدہ (Mutual NDA) دستخط کرتے ہیں۔"
        : "You retain 100% intellectual property (IP) and full source code ownership upon milestone delivery. We execute a legally binding Mutual NDA prior to project kickoff to protect your proprietary logic.",
      expression: 'happy',
      suggestedActions: ['🔒 Request Mutual NDA', '📝 Start Secure Project', '💬 Chat on WhatsApp'],
    };
  }

  // 12. GREETINGS (hi, hello, salam, hey)
  if (
    query.includes('hi') ||
    query.includes('hello') ||
    query.includes('salam') ||
    query.includes('hey') ||
    query.includes('aoa') ||
    query === 'test'
  ) {
    return {
      reply: isUrdu
        ? "السلام علیکم! 👋 میں TechMate AI ہوں۔\n\nمیں TECHMATE میں آپ کا ڈیجیٹل ساتھی ہوں۔ آپ اپنے پراجیکٹ کے خیال کو ڈیجیٹل حقیقت میں کیسے بدلنا چاہتے ہیں؟"
        : "Hi! 👋 I'm TechMate AI.\n\nI'm your digital mate at TECHMATE. How can I help you turn your idea into digital reality?",
      expression: 'happy',
      suggestedActions: ['🌐 Build a Website', '📱 Create an App', '💻 Custom Software', '🤖 AI Solutions'],
    };
  }

  // 13. DEFAULT SMART CONTEXTUAL FALLBACK
  return {
    reply: isUrdu
      ? "شکریہ! TECHMATE آپ کے خیال کو جدید ترین کوڈ اور بہترین ڈیزائن کے ساتھ حقیقت میں بدل سکتا ہے۔ کیا آپ چاہتے ہیں کہ میں آپ کے پراجیکٹ کی مختصر تفصیلات نوٹ کر کے ہماری ٹیم کو بھیج دوں؟"
      : "Thanks for sharing that! TECHMATE transforms ideas like yours into scalable digital reality through high-performance engineering and human-centered design. Would you like to start a project inquiry or connect with our engineering team?",
    expression: 'helping',
    suggestedActions: ['🚀 Start Project Consultation', '💬 Talk on WhatsApp (+92 3224787839)', '🌐 Explore Services'],
  };
}
