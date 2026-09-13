import React from 'react';
import { Lightbulb, ShieldCheck, Users2, TrendingUp, Sparkles, Network, ArrowRight } from 'lucide-react';
import { TechmateMark } from './TechmateLogo';

export const WhyTechmateSection: React.FC = () => {
  const values = [
    {
      id: 'innovation',
      title: 'Innovation',
      tag: 'Next-Gen Focus',
      description: 'We explore new ideas and technologies to build better solutions that outperform market conventions.',
      icon: Lightbulb,
    },
    {
      id: 'reliability',
      title: 'Reliability',
      tag: 'Rock-Solid Code',
      description: 'We build dependable products designed for long-term success with high uptime and strict security.',
      icon: ShieldCheck,
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      tag: 'True Alignment',
      description: 'We work closely with clients to transform ideas into reality with complete transparency and weekly sprints.',
      icon: Users2,
    },
    {
      id: 'growth',
      title: 'Growth',
      tag: 'Scalable Impact',
      description: 'We create technology that helps businesses move forward, expand user bases, and unlock new revenue.',
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#0B1D3A] text-white relative overflow-hidden">
      {/* Subtle background tech grid and glowing orbs */}
      <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1E63F3]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#4DA8FF]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E63F3]/20 border border-[#1E63F3]/40 text-[#4DA8FF] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA8FF]" />
            <span>Why Businesses Choose Us</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-['Poppins']">
            More Than Software.{' '}
            <span className="block mt-1 bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] bg-clip-text text-transparent">
              A Technology Partner.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            We don’t just write code; we partner with visionary founders and enterprises to engineer lasting digital advantages.
          </p>
        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.id}
                className="group relative bg-[#112B5F]/80 hover:bg-[#112B5F] rounded-2xl p-7 border border-white/10 hover:border-[#4DA8FF]/50 shadow-lg hover:shadow-[0_10px_30px_rgba(30,99,243,0.3)] transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Top Accent Icon & Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#1E63F3] text-[#4DA8FF] group-hover:text-white transition-all duration-300 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono text-[#4DA8FF] tracking-wide uppercase px-2 py-0.5 rounded bg-white/5">
                    {val.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 font-['Poppins'] group-hover:text-[#4DA8FF] transition-colors">
                  {val.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {val.description}
                </p>

                {/* Subtle corner glow dot */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#1E63F3] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* The TECHMATE Brand Mark Formula (Directly from User Branding Kit) */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#112B5F] via-[#0B1D3A] to-[#112B5F] p-8 border border-white/10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#4DA8FF] mb-2 flex items-center gap-2">
                <Network className="w-4 h-4" />
                <span>The TECHMATE Symbol Architecture</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-['Poppins']">
                Technology + Connection + Growth = The Ascending Form
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                The three ascending nodes connected in our brand symbol embody our foundational philosophy: starting with robust engineering (Technology), forging enduring client partnerships (Connection), and building systems that scale exponentially (Growth).
              </p>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center lg:justify-end gap-6">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
                <TechmateMark size={64} idSuffix="why_techmate_concept" />
                <div className="text-left">
                  <div className="text-xs font-mono text-slate-400">Mark Symbolism</div>
                  <div className="text-sm font-bold text-white">Ascending Progress</div>
                  <div className="text-[10px] text-[#4DA8FF]">Digital Future Vision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyTechmateSection;
