import React, { useState } from 'react';
import { ArrowRight, Code2, Terminal, Cpu, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { TechmateMark } from './TechmateLogo';
import { TechMateAIAvatar } from './TechMateAIAvatar';
import { triggerTechMateAi } from './ChatWidget';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartProject, onExploreWork }) => {
  const { t, isUrdu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'ai' | 'engine'>('ai');
  const [heroPromptInput, setHeroPromptInput] = useState('');

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden tech-grid-pattern-dark bg-[#0B1D3A]">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1E63F3]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#4DA8FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#112B5F] border border-white/10 rounded-full shadow-inner w-fit mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4DA8FF] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4DA8FF]">
                {t('heroBadge')}
              </span>
            </div>

            {/* Main Heading */}
            {isUrdu ? (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-normal leading-[1.3] mb-6 font-['Poppins',sans-serif]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF]">
                  سافٹ ویئر کی تعمیر۔
                </span>
                <br />
                <span className="text-white">نئے امکانات کی تخلیق۔</span>
              </h1>
            ) : (
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 font-['Poppins']">
                Building{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF]">
                  Software.
                </span>
                <br />
                Creating{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4DA8FF] to-[#1E63F3]">
                  Possibilities.
                </span>
              </h1>
            )}

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-8 font-normal">
              {t('heroDescription')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-[#0B1D3A] bg-white rounded-xl shadow-2xl hover:translate-y-[-2px] transition-all cursor-pointer active:scale-98 group"
              >
                <span>{t('heroCtaPrimary')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="group inline-flex items-center justify-center gap-3 px-6 py-4 text-sm font-bold text-white border border-white/10 hover:bg-white/5 rounded-xl transition-all cursor-pointer active:scale-98"
              >
                <span>{t('heroCtaSecondary')}</span>
                <span className="text-[#4DA8FF] group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-white/70 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA8FF]" />
                <span>Enterprise Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA8FF]" />
                <span>Rapid Agile Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4DA8FF]" />
                <span>Modern Clean Code</span>
              </div>
            </div>
          </div>

          {/* Right Column: Abstract Modern Technology Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-[480px]">
              {/* Outer Decorative Tech Frame */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#112B5F] to-[#0B1D3A] p-6 shadow-2xl text-white border border-white/10 overflow-hidden">
                {/* Circuit Grid Backing */}
                <div className="absolute inset-0 tech-grid-pattern-dark opacity-40 pointer-events-none" />

                {/* Top Window Bar with Interactive Tab Switcher */}
                <div className="relative flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80 inline-block" />
                  </div>

                  {/* Tabs: TechMate AI & Architecture Engine */}
                  <div className="flex items-center bg-[#0B1D3A]/80 p-0.5 rounded-lg border border-white/10 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveTab('ai')}
                      className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-medium ${
                        activeTab === 'ai'
                          ? 'bg-[#1E63F3] text-white shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3 h-3 text-[#4DA8FF]" />
                      <span>TechMate AI</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('engine')}
                      className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-medium ${
                        activeTab === 'engine'
                          ? 'bg-[#1E63F3] text-white shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <Terminal className="w-3 h-3 text-[#4DA8FF]" />
                      <span>Core Engine</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live</span>
                  </div>
                </div>

                {/* Tab Content 1: TECHMATE AI ASSISTANT PREVIEW */}
                {activeTab === 'ai' ? (
                  <div className="relative py-2 flex flex-col">
                    {/* Header banner */}
                    <div className="flex items-center gap-3 mb-4 bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="w-12 h-12 rounded-xl bg-[#0B1D3A] border border-[#4DA8FF]/40 flex items-center justify-center shrink-0">
                        <TechMateAIAvatar size="sm" expression="happy" state="idle" interactive={false} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-white">Meet TechMate AI</h4>
                          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            AI Online
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Your intelligent assistant for all your digital needs.
                        </p>
                      </div>
                    </div>

                    {/* Chat Bubble Preview */}
                    <div className="bg-[#0B1D3A]/90 rounded-2xl p-4 border border-white/10 mb-4 shadow-inner">
                      <div className="flex items-start gap-2.5">
                        <div className="shrink-0 mt-0.5">
                          <TechMateAIAvatar size="xs" expression="happy" state="idle" interactive={false} />
                        </div>
                        <div className="text-xs text-slate-200 leading-relaxed">
                          <p className="font-semibold text-white mb-1">Hi! 👋 I&apos;m TechMate AI.</p>
                          <p>How can I help you turn your idea into digital reality?</p>
                          <span className="text-[9px] text-slate-400 block mt-1.5">10:30 AM • Official Assistant</span>
                        </div>
                      </div>

                      {/* Quick Interactive Prompt Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => triggerTechMateAi('I need a website for my business')}
                          className="text-left text-[11px] font-medium p-2 rounded-lg bg-white/5 hover:bg-[#1E63F3]/30 border border-white/10 hover:border-[#4DA8FF]/50 text-white transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <span>🌐 Build a Website</span>
                          <span className="text-[#4DA8FF] group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => triggerTechMateAi('I want to build a mobile application')}
                          className="text-left text-[11px] font-medium p-2 rounded-lg bg-white/5 hover:bg-[#1E63F3]/30 border border-white/10 hover:border-[#4DA8FF]/50 text-white transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <span>📱 Create an App</span>
                          <span className="text-[#4DA8FF] group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => triggerTechMateAi('Tell me about custom software development')}
                          className="text-left text-[11px] font-medium p-2 rounded-lg bg-white/5 hover:bg-[#1E63F3]/30 border border-white/10 hover:border-[#4DA8FF]/50 text-white transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <span>💻 Custom Software</span>
                          <span className="text-[#4DA8FF] group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => triggerTechMateAi('How can I contact the TECHMATE team?')}
                          className="text-left text-[11px] font-medium p-2 rounded-lg bg-white/5 hover:bg-[#1E63F3]/30 border border-white/10 hover:border-[#4DA8FF]/50 text-white transition-all cursor-pointer flex items-center justify-between group"
                        >
                          <span>👥 Talk to Our Team</span>
                          <span className="text-[#4DA8FF] group-hover:translate-x-0.5 transition-transform">→</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Input Bar */}
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ask TechMate AI anything..."
                        value={heroPromptInput}
                        onChange={(e) => setHeroPromptInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && heroPromptInput.trim()) {
                            triggerTechMateAi(heroPromptInput.trim());
                            setHeroPromptInput('');
                          }
                        }}
                        className="flex-1 bg-[#0B1D3A] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#4DA8FF]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (heroPromptInput.trim()) {
                            triggerTechMateAi(heroPromptInput.trim());
                            setHeroPromptInput('');
                          } else {
                            triggerTechMateAi();
                          }
                        }}
                        className="p-2 rounded-xl bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] text-white hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                        title="Start live chat"
                        aria-label="Send query to TechMate AI"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Tab Content 2: CORE ENGINE ARCHITECTURE */
                  <div className="relative py-6 flex flex-col items-center justify-center">
                    {/* Subtle Central Glow */}
                    <div className="absolute w-44 h-44 bg-[#1E63F3]/25 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />

                    {/* Connected SVG Traces */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240" fill="none">
                      <path
                        d="M 60 190 L 140 190 L 200 120 L 290 120 L 330 60"
                        stroke="#1E63F3"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-40"
                      />
                      <path
                        d="M 120 220 L 200 130 L 270 130"
                        stroke="#4DA8FF"
                        strokeWidth="1.5"
                        className="opacity-30"
                      />
                      <circle cx="200" cy="120" r="4" fill="#4DA8FF" className="animate-ping" />
                    </svg>

                    {/* Main TECHMATE Mark with floating aura */}
                    <div className="relative z-10 transition-transform hover:scale-105 duration-300">
                      <TechmateMark size={140} idSuffix="hero_interactive" className="drop-shadow-[0_10px_25px_rgba(30,99,243,0.5)]" />
                    </div>

                    {/* Code snippet window below mark */}
                    <div className="w-full mt-4 bg-[#0B1D3A]/80 backdrop-blur-md rounded-lg p-3 font-mono text-xs text-slate-300 border border-white/10">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="flex items-center gap-1">
                          <Code2 className="w-3 h-3 text-[#1E63F3]" />
                          <span>Architecture Pipeline</span>
                        </span>
                        <span className="text-[#4DA8FF]">v2.6 Stable</span>
                      </div>
                      <p className="text-slate-400">
                        <span className="text-[#4DA8FF]">const</span> solution = <span className="text-amber-300">new</span>{' '}
                        <span className="text-[#1E63F3] font-semibold">TechmateEngine</span>(&#123;
                      </p>
                      <p className="pl-4 text-slate-300">
                        scalable: <span className="text-emerald-400">true</span>, performance: <span className="text-emerald-400">&apos;100%&apos;</span>
                      </p>
                      <p className="text-slate-400">&#125;).<span className="text-[#4DA8FF]">buildPossibilities</span>();</p>
                    </div>
                  </div>
                )}

                {/* Floating Metric Pill 1 (Top Left) */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-[#0B1D3A]/90 backdrop-blur-xl text-white rounded-xl p-3 shadow-2xl border border-white/15 flex items-center gap-3 animate-float-slow">
                  <div className="w-9 h-9 rounded-lg bg-[#1E63F3]/20 flex items-center justify-center text-[#4DA8FF]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Engineering</div>
                    <div className="text-sm font-bold text-white">100% Quality</div>
                  </div>
                </div>

                {/* Floating Metric Pill 2 (Bottom Right) */}
                <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-[#0B1D3A]/90 backdrop-blur-xl text-white rounded-xl p-3 shadow-2xl border border-white/15 flex items-center gap-3 animate-float-slow [animation-delay:2s]">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Digital Uptime</div>
                    <div className="text-sm font-bold text-[#4DA8FF]">99.99% Precision</div>
                  </div>
                </div>
              </div>

              {/* Floating Ascending Geometric Blocks (connecting with logo concept) */}
              <div className="absolute -z-10 -bottom-8 -left-8 w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E63F3] to-[#4DA8FF] opacity-30 blur-sm transform -rotate-12 animate-pulse" />
              <div className="absolute -z-10 top-12 -right-6 w-10 h-10 rounded-lg bg-[#4DA8FF] opacity-30 transform rotate-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
