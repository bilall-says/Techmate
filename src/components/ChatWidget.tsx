import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Sparkles,
  Phone,
  Volume2,
  VolumeX,
  Minimize2,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Mail,
  User,
  FileText,
  DollarSign,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { useLanguage } from '../context/LanguageContext';
import { TechMateAIAvatar, AvatarExpression, AvatarState } from './TechMateAIAvatar';
import {
  quickActions,
  getTechmateAiResponse,
  AiResponseResult,
  ProjectInquiryData
} from '../data/techmateAiKnowledge';
import {
  playSendMessageSound,
  playReceiveMessageSound,
  playNotificationAlertSound,
  playToggleFeedbackSound,
  unlockAudioContext
} from '../utils/chatAudio';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  expression?: AvatarExpression;
  suggestedActions?: string[];
  isForm?: boolean;
  formSubmitted?: boolean;
  isGemini?: boolean;
}

/**
 * Global helper to trigger TechMate AI from any section or button on the website
 */
export function triggerTechMateAi(query?: string) {
  window.dispatchEvent(new CustomEvent('techmate:open-ai', { detail: { query } }));
}

interface ChatWidgetProps {
  onOpenContactForm?: (serviceContext?: string) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onOpenContactForm }) => {
  const { isUrdu } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Sound enabled state with persistent local storage
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('techmate_chat_sound_enabled');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return true;
  });

  const [soundToast, setSoundToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggleSound = () => {
    unlockAudioContext();
    setSoundEnabled((prev) => {
      const nextState = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('techmate_chat_sound_enabled', String(nextState));
      }
      if (nextState) {
        playToggleFeedbackSound(true);
      }
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      setSoundToast(
        nextState
          ? (isUrdu ? 'آواز آن ہے' : 'Sound effects on')
          : (isUrdu ? 'آواز میوٹ ہے' : 'Sound effects muted')
      );
      toastTimeoutRef.current = setTimeout(() => {
        setSoundToast(null);
      }, 1600);
      return nextState;
    });
  };

  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState<'idle' | 'typing' | 'responding'>('idle');
  const [avatarExpression, setAvatarExpression] = useState<AvatarExpression>('happy');
  const [hasUnread, setHasUnread] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Lead Generation Project Form State
  const [inquiryForm, setInquiryForm] = useState<ProjectInquiryData>({
    name: '',
    email: '',
    company: '',
    projectType: 'Web Development',
    description: '',
    budget: 'PKR 150k - 400k',
    ndaRequired: true,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message according to spec
  const initialGreeting: ChatMessage = {
    id: 'msg-welcome',
    sender: 'ai',
    expression: 'happy',
    text: isUrdu
      ? "السلام علیکم! 👋 میں TechMate AI ہوں۔\n\nمیں TECHMATE میں آپ کا ڈیجیٹل ساتھی ہوں۔ آپ اپنے خیال کو ڈیجیٹل حقیقت میں کیسے تبدیل کرنا چاہتے ہیں؟"
      : "Hi! 👋 I'm TechMate AI.\n\nI'm your digital mate at TECHMATE.\nHow can I help you turn your idea into digital reality?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedActions: [
      'Build a Website',
      'Create an App',
      'Custom Software',
      'UI/UX Design',
      'AI Solutions',
      'Talk to Our Team'
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  // Keyboard shortcut: Escape to minimize or close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Global event listener to trigger chatbot from anywhere on the page
  useEffect(() => {
    const handleOpenAi = (e: Event) => {
      const customEvent = e as CustomEvent<{ query?: string }>;
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      if (customEvent.detail?.query) {
        setTimeout(() => {
          handleSendMessage(customEvent.detail.query);
        }, 250);
      }
    };
    window.addEventListener('techmate:open-ai', handleOpenAi);
    return () => window.removeEventListener('techmate:open-ai', handleOpenAi);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatState, isOpen, isMinimized, formSubmitted]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, isMinimized]);

  const handleToggleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
    } else {
      setIsOpen(false);
    }
  };

  const handleRestartConversation = () => {
    setMessages([
      {
        ...initialGreeting,
        id: `msg-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setAvatarExpression('happy');
    setFormSubmitted(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    // Play subtle, tactile modern SaaS send sound
    unlockAudioContext();
    playSendMessageSound(soundEnabled);

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = messages.slice(-10).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setChatState('typing');
    setAvatarExpression('thinking');

    // Asynchronously fetch response from Gemini API route, with immediate fallback
    const fetchResponse = async (): Promise<{ result: AiResponseResult; isGemini: boolean }> => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 14000);

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: text,
            history: currentHistory,
            isUrdu
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        if (data && data.success && data.reply) {
          return {
            result: {
              reply: data.reply,
              expression: data.expression || 'happy',
              suggestedActions: data.suggestedActions,
              showProjectForm: Boolean(data.showProjectForm)
            },
            isGemini: true
          };
        }

        // Server signaled fallback (e.g. missing API key)
        return {
          result: getTechmateAiResponse(text, isUrdu),
          isGemini: false
        };
      } catch (err) {
        console.warn('Gemini chat unavailable, falling back to local assistant knowledge base:', err);
        return {
          result: getTechmateAiResponse(text, isUrdu),
          isGemini: false
        };
      }
    };

    fetchResponse().then(({ result, isGemini }) => {
      setChatState('responding');
      setAvatarExpression(result.expression);

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: result.reply,
        expression: result.expression,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: result.suggestedActions,
        isForm: result.showProjectForm,
        isGemini
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Play subtle notification or in-chat receive sound based on visibility state
      if (!isOpen || isMinimized) {
        playNotificationAlertSound(soundEnabled);
        setHasUnread(true);
      } else {
        playReceiveMessageSound(soundEnabled);
      }

      setTimeout(() => {
        setChatState('idle');
      }, 500);
    });
  };

  const handleQuickAction = (actionText: string) => {
    if (actionText.includes('WhatsApp')) {
      const waUrl = `https://wa.me/923224787839?text=${encodeURIComponent(
        'Hello TECHMATE! I am chatting with TechMate AI on your website and would like to discuss a project.'
      )}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (actionText.includes('Architecture Call') || actionText.includes('Contact section')) {
      if (onOpenContactForm) {
        onOpenContactForm();
      }
      return;
    }

    handleSendMessage(actionText);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.description) return;

    // Play subtle send sound on form submission
    unlockAudioContext();
    playSendMessageSound(soundEnabled);

    setFormSubmitting(true);
    setChatState('typing');
    setAvatarExpression('thinking');

    setTimeout(() => {
      setFormSubmitting(false);
      setFormSubmitted(true);
      setChatState('idle');
      setAvatarExpression('excited');

      const confirmationMsg: ChatMessage = {
        id: `msg-confirm-${Date.now()}`,
        sender: 'ai',
        expression: 'excited',
        text: isUrdu
          ? "شکریہ! آپ کے پراجیکٹ کی تفصیلات موصول ہو چکی ہیں۔ TECHMATE کی ٹیم ان کا جائزہ لے کر جلد از جلد آپ سے رابطہ کرے گی۔"
          : "Thanks! Your project details have been received. The TECHMATE team will review them and get in touch.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: ['💬 Connect on WhatsApp (+92 3224787839)', '🌐 Explore Portfolio', 'Ask Another Question']
      };

      setMessages((prev) => [...prev, confirmationMsg]);

      if (!isOpen || isMinimized) {
        playNotificationAlertSound(soundEnabled);
      } else {
        playReceiveMessageSound(soundEnabled);
      }
    }, 1200);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* 1. CHATBOT EXPANDED PANEL */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[86vh] mb-3 flex flex-col rounded-3xl bg-[#0B1D3A]/98 backdrop-blur-xl border border-[#1E63F3]/30 shadow-[0_20px_60px_rgba(11,29,58,0.9),0_0_35px_rgba(30,99,243,0.25)] overflow-hidden text-white select-none"
            role="dialog"
            aria-label="TechMate AI Digital Assistant"
          >
            {/* Top SaaS Header */}
            <div className="relative px-4 py-3.5 bg-gradient-to-r from-[#0B1D3A] via-[#112B5F] to-[#0B1D3A] border-b border-white/10 flex items-center justify-between shrink-0">
              {/* Left: Avatar + Branding */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#112B5F] to-[#0B1D3A] p-0.5 border border-[#4DA8FF]/40 shadow-[0_0_15px_rgba(77,168,255,0.3)] flex items-center justify-center overflow-visible">
                    <TechMateAIAvatar
                      size="sm"
                      expression={avatarExpression}
                      state={chatState as AvatarState}
                      interactive={false}
                    />
                  </div>
                  {/* Glowing Status Dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#0B1D3A] flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-400/40 animate-pulse" />
                  </span>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                      <span>TechMate AI</span>
                      <span className="text-[10px] px-1.5 py-0.5 font-medium rounded-full bg-[#1E63F3]/30 text-[#4DA8FF] border border-[#4DA8FF]/20 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Gemini AI</span>
                      </span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-white/60 text-[11px]">Your Digital Mate</span>
                    <span className="text-white/30">•</span>
                    <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Controls (Restart, Sound, Minimize, Close) */}
              <div className="flex items-center gap-1 text-white/70">
                <button
                  type="button"
                  onClick={handleRestartConversation}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={isUrdu ? 'گفتگو دوبارہ شروع کریں' : 'Restart conversation'}
                  aria-label="Restart conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Sound Toggle Button (Modern SaaS Design with Sound Feedback) */}
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${
                    soundEnabled
                      ? 'text-[#4DA8FF] bg-[#1E63F3]/15 hover:bg-[#1E63F3]/25 shadow-sm'
                      : 'text-white/40 hover:text-white hover:bg-white/10'
                  }`}
                  title={
                    soundEnabled
                      ? (isUrdu ? 'آواز کے اثرات بند کریں' : 'Sound effects: ON (Click to mute)')
                      : (isUrdu ? 'آواز کے اثرات آن کریں' : 'Sound effects: OFF (Click to unmute)')
                  }
                  aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-[#4DA8FF]" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-white/40" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  title={isUrdu ? 'چھوٹا کریں' : 'Minimize'}
                  aria-label="Minimize chat"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
                  title={isUrdu ? 'بند کریں' : 'Close'}
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* SaaS Sound Feedback Micro-Toast */}
            <AnimatePresence>
              {soundToast && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-14 right-4 z-30 px-3 py-1.5 rounded-full bg-[#112B5F]/95 backdrop-blur-md border border-[#4DA8FF]/40 text-[11px] text-white font-medium shadow-xl flex items-center gap-1.5 pointer-events-none"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-3.5 h-3.5 text-[#4DA8FF]" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-white/50" />
                  )}
                  <span>{soundToast}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversation Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth">
              {messages.map((msg) => {
                const isAi = msg.sender === 'ai';

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAi ? 'items-start' : 'items-end'} transition-all`}
                  >
                    <div className={`flex items-end gap-2.5 max-w-[88%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Avatar for AI */}
                      {isAi && (
                        <div className="shrink-0 mb-1">
                          <TechMateAIAvatar
                            size="xs"
                            expression={msg.expression || 'happy'}
                            state="idle"
                            interactive={false}
                          />
                        </div>
                      )}

                      {/* Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl leading-relaxed ${
                          isAi
                            ? 'bg-[#112B5F]/90 text-white border border-white/10 rounded-bl-sm shadow-md'
                            : 'bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] text-white rounded-br-sm shadow-md font-medium whitespace-pre-wrap'
                        }`}
                      >
                        {isAi ? (
                          <div className="text-sm text-white/95 leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:my-2 [&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:my-2 [&>li]:my-0.5 [&>strong]:text-[#4DA8FF] [&>strong]:font-semibold [&>code]:bg-[#0B1D3A] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[#4DA8FF] [&>code]:text-xs">
                            <Markdown>{msg.text}</Markdown>
                          </div>
                        ) : (
                          msg.text
                        )}

                        {/* Interactive In-Chat Project Inquiry Mini-Form */}
                        {msg.isForm && !formSubmitted && (
                          <div className="mt-3.5 pt-3 border-t border-white/15">
                            <form onSubmit={handleFormSubmit} className="space-y-2.5 text-xs text-left">
                              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4DA8FF]">
                                <Building2 className="w-3.5 h-3.5" />
                                <span>TECHMATE Project Consultation Brief</span>
                              </div>

                              <div>
                                <label className="block text-white/70 mb-1 font-medium">Your Name *</label>
                                <div className="relative">
                                  <User className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-white/40" />
                                  <input
                                    type="text"
                                    required
                                    placeholder="e.g. Asad Khan"
                                    value={inquiryForm.name}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                                    className="w-full bg-[#0B1D3A] border border-white/15 rounded-lg py-1.5 pl-8 pr-3 text-white placeholder-white/40 focus:outline-none focus:border-[#4DA8FF]"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-white/70 mb-1 font-medium">Email Address *</label>
                                <div className="relative">
                                  <Mail className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-white/40" />
                                  <input
                                    type="email"
                                    required
                                    placeholder="e.g. asad@company.com"
                                    value={inquiryForm.email}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                    className="w-full bg-[#0B1D3A] border border-white/15 rounded-lg py-1.5 pl-8 pr-3 text-white placeholder-white/40 focus:outline-none focus:border-[#4DA8FF]"
                                  />
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-white/70 mb-1 font-medium">Project Type</label>
                                  <select
                                    value={inquiryForm.projectType}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, projectType: e.target.value })}
                                    className="w-full bg-[#0B1D3A] border border-white/15 rounded-lg py-1.5 px-2 text-white focus:outline-none focus:border-[#4DA8FF]"
                                  >
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App Development">Mobile App (Flutter/RN)</option>
                                    <option value="Custom Software">Custom Software / API</option>
                                    <option value="UI/UX Design">UI/UX Product Design</option>
                                    <option value="AI & Smart Solutions">AI & Smart Solutions</option>
                                    <option value="Cloud Solutions">Cloud / DevOps</option>
                                  </select>
                                </div>

                                <div>
                                  <label className="block text-white/70 mb-1 font-medium">Est. Budget</label>
                                  <select
                                    value={inquiryForm.budget}
                                    onChange={(e) => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
                                    className="w-full bg-[#0B1D3A] border border-white/15 rounded-lg py-1.5 px-2 text-white focus:outline-none focus:border-[#4DA8FF]"
                                  >
                                    <option value="PKR 50k - 150k">PKR 50k – 150k (MVP)</option>
                                    <option value="PKR 150k - 400k">PKR 150k – 400k (Growth)</option>
                                    <option value="PKR 400k - 1M+">PKR 400k – 1M+ (Enterprise)</option>
                                    <option value="USD Global">USD Foreign Currency</option>
                                  </select>
                                </div>
                              </div>

                              <div>
                                <label className="block text-white/70 mb-1 font-medium">Short Project Description *</label>
                                <textarea
                                  required
                                  rows={2}
                                  placeholder="Describe the main idea, target audience, and key features..."
                                  value={inquiryForm.description}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, description: e.target.value })}
                                  className="w-full bg-[#0B1D3A] border border-white/15 rounded-lg p-2 text-white placeholder-white/40 focus:outline-none focus:border-[#4DA8FF] resize-none"
                                />
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                <input
                                  type="checkbox"
                                  id="nda-checkbox"
                                  checked={inquiryForm.ndaRequired}
                                  onChange={(e) => setInquiryForm({ ...inquiryForm, ndaRequired: e.target.checked })}
                                  className="rounded border-white/20 text-[#1E63F3] focus:ring-[#4DA8FF]"
                                />
                                <label htmlFor="nda-checkbox" className="text-[11px] text-white/70 cursor-pointer flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-[#4DA8FF]" />
                                  <span>Execute Mutual Non-Disclosure Agreement (NDA)</span>
                                </label>
                              </div>

                              <button
                                type="submit"
                                disabled={formSubmitting}
                                className="w-full py-2.5 px-4 bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                              >
                                {formSubmitting ? (
                                  <>
                                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Transmitting to TECHMATE...</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Start Project</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-white/40 mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick action buttons attached to this message */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5 pl-8 max-w-[90%]">
                        {msg.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleQuickAction(action)}
                            className="text-[11px] font-medium px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-[#1E63F3]/25 border border-white/10 hover:border-[#4DA8FF]/40 text-white/90 hover:text-white transition-all cursor-pointer active:scale-95"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator state */}
              {chatState === 'typing' && (
                <div className="flex items-end gap-2.5">
                  <div className="shrink-0 mb-1">
                    <TechMateAIAvatar size="xs" expression="thinking" state="thinking" interactive={false} />
                  </div>
                  <div className="p-3 bg-[#112B5F]/90 border border-white/10 rounded-2xl rounded-bl-sm shadow-md flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4DA8FF] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#4DA8FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-[#4DA8FF] animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs text-white/50 ml-1 font-mono">TechMate AI is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Strip */}
            <div className="px-3 py-2 bg-[#0B1D3A] border-t border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-[#4DA8FF] shrink-0 pl-1">
                Quick:
              </span>
              {quickActions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleQuickAction(item.query)}
                  className="shrink-0 text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Message Input Bar */}
            <div className="p-3 bg-[#112B5F]/60 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full bg-[#0B1D3A]/90 text-white placeholder-white/40 text-sm px-3.5 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-[#4DA8FF] focus:ring-1 focus:ring-[#4DA8FF] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Direct Support Micro-Footer with Sound Status */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/50 px-1 border-t border-white/5 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#4DA8FF]" />
                  <span>100% IP &amp; NDA Protected</span>
                </span>
                
                <div className="flex items-center gap-2.5">
                  {/* Footer Sound Toggle */}
                  <button
                    type="button"
                    onClick={handleToggleSound}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    title={
                      soundEnabled
                        ? (isUrdu ? 'آواز کے اثرات آن ہیں (میوٹ کرنے کیلئے کلک کریں)' : 'Audio enabled (click to mute)')
                        : (isUrdu ? 'آواز کے اثرات میوٹ ہیں (آن کرنے کیلئے کلک کریں)' : 'Audio muted (click to unmute)')
                    }
                  >
                    {soundEnabled ? (
                      <>
                        <Volume2 className="w-3 h-3 text-[#4DA8FF]" />
                        <span className="text-[#4DA8FF] font-medium">Audio ON</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3 h-3 text-white/40" />
                        <span className="text-white/40">Muted</span>
                      </>
                    )}
                  </button>

                  <span className="text-white/20">•</span>

                  <a
                    href="https://wa.me/923224787839"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#4DA8FF] transition-colors flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MINIMIZED BAR (When user minimizes the chat) */}
      <AnimatePresence>
        {isOpen && isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={() => setIsMinimized(false)}
            className="pointer-events-auto mb-3 px-4 py-2.5 rounded-2xl bg-[#0B1D3A] border border-[#1E63F3]/40 shadow-xl flex items-center gap-3 cursor-pointer hover:border-[#4DA8FF] transition-all"
          >
            <TechMateAIAvatar size="xs" expression="happy" state="idle" interactive={false} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">TechMate AI</span>
              <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Chat Minimized — Click to Resume
              </span>
            </div>
            <X
              className="w-3.5 h-3.5 text-white/40 hover:text-white ml-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FLOATING TECHMATE AI CHATBOT BUTTON */}
      <div className="relative pointer-events-auto flex items-center gap-2">
        {/* Tooltip on Hover */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1D3A] border border-[#4DA8FF]/30 text-xs text-white shadow-xl whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4DA8FF]" />
              <span>Talk to TechMate AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button Container with Subtle Breathing / Hover Animation */}
        <motion.button
          type="button"
          onClick={handleToggleOpen}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-1.5 rounded-full bg-gradient-to-b from-[#112B5F] to-[#0B1D3A] border-2 border-[#1E63F3] hover:border-[#4DA8FF] shadow-[0_0_25px_rgba(30,99,243,0.45)] hover:shadow-[0_0_35px_rgba(77,168,255,0.65)] transition-all cursor-pointer flex items-center justify-center"
          aria-label={isOpen ? 'Close TechMate AI Assistant' : 'Open TechMate AI Assistant'}
        >
          {/* Subtle Ambient Breathing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-[#4DA8FF]/20 blur-md pointer-events-none group-hover:bg-[#4DA8FF]/35 transition-all" />

          {/* Official TechMate AI Avatar */}
          <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
            <TechMateAIAvatar
              size="lg"
              expression={isOpen ? 'excited' : 'happy'}
              state={isOpen ? 'responding' : 'idle'}
              interactive={false}
            />
          </div>

          {/* "AI Online" Badge */}
          <div className="absolute -top-1.5 -left-1 sm:-left-2 px-2 py-0.5 rounded-full bg-[#0B1D3A] border border-emerald-400/40 text-[9px] font-bold text-emerald-400 flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Online</span>
          </div>

          {/* New message notification badge */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce shadow-lg">
              1
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ChatWidget;
