import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TechmateMark } from './TechmateLogo';

interface BrandStatementSectionProps {
  onStartProject: () => void;
}

export const BrandStatementSection: React.FC<BrandStatementSectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative py-28 md:py-40 bg-[#0B1D3A] text-white overflow-hidden border-y border-white/5">
      {/* Abstract Background: Dark grid + floating glowing blocks + connected dot network */}
      <div className="absolute inset-0 tech-grid-pattern-dark opacity-35 pointer-events-none" />
      <div className="absolute inset-0 tech-dot-pattern-dark opacity-40 pointer-events-none" />

      {/* Radiant ambient glow centers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#1E63F3]/25 to-[#4DA8FF]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#1E63F3]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Ascending Blocks in background (matching TECHMATE logo) */}
      <div className="absolute top-12 left-[10%] opacity-20 pointer-events-none animate-float-slow">
        <TechmateMark size={110} idSuffix="bg_brand_left" />
      </div>

      <div className="absolute bottom-12 right-[8%] opacity-25 pointer-events-none animate-float-slow [animation-delay:3s]">
        <TechmateMark size={140} idSuffix="bg_brand_right" />
      </div>

      <div className="absolute top-1/3 right-[25%] w-12 h-12 rounded-xl bg-gradient-to-br from-[#1E63F3] to-[#4DA8FF] opacity-30 transform rotate-45 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 left-[20%] w-8 h-8 rounded-lg bg-[#4DA8FF] opacity-25 transform -rotate-12 pointer-events-none" />

      {/* Connected Circuit SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="8 8" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="8 8" />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0B1D3A" />
            <stop offset="50%" stopColor="#1E63F3" />
            <stop offset="100%" stopColor="#0B1D3A" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtle Brand Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.25em] mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#4DA8FF]" />
          <span>TECHMATE BRAND MANIFESTO</span>
        </div>

        {/* Large Powerful Typography */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] font-['Poppins'] mb-8">
          <span className="block text-white">Turning Ideas</span>
          <span className="block mt-2 bg-gradient-to-r from-[#1E63F3] via-[#4DA8FF] to-white bg-clip-text text-transparent">
            Into Digital Reality.
          </span>
        </h2>

        {/* Brand Core Ethos */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          We bridge the gap between bold imagination and production-grade software. Building the digital infrastructure that empowers modern enterprises to thrive.
        </p>

        {/* Direct Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onStartProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] hover:from-[#112B5F] hover:to-[#1E63F3] rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 active:scale-98 cursor-pointer group"
          >
            <span>Let&apos;s Build Together</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <span>Explore Case Studies</span>
          </a>
        </div>
      </div>
    </section>
  );
};
export default BrandStatementSection;
