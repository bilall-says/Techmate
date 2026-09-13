import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TechmateMark } from './TechmateLogo';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartProject }) => {
  return (
    <section className="py-20 md:py-28 bg-[#0B1D3A] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B1D3A] via-[#112B5F] to-[#0B1D3A] p-8 sm:p-14 lg:p-20 text-white overflow-hidden shadow-2xl border border-white/10 text-center">
          {/* Subtle grid pattern & glow effects */}
          <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#1E63F3]/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#4DA8FF]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Logo Mark Accent */}
          <div className="absolute right-6 top-6 opacity-15 pointer-events-none hidden md:block">
            <TechmateMark size={160} idSuffix="cta_floating" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Small Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let&apos;s Build Together</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-5 font-['Poppins']">
              Have an Idea?
            </h2>

            {/* Main Text */}
            <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-200 mb-8 font-['Poppins']">
              Let&apos;s turn it into something{' '}
              <span className="bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] bg-clip-text text-transparent font-bold">
                powerful.
              </span>
            </p>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
              Whether you are launching a transformative MVP, scaling an enterprise platform, or modernizing legacy infrastructure, TECHMATE is your dedicated engineering partner.
            </p>

            {/* Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onStartProject}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] hover:from-[#112B5F] hover:to-[#1E63F3] rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 active:scale-98 cursor-pointer group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Direct Contact Details ↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CtaSection;
