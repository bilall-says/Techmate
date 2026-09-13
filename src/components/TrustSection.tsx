import React from 'react';
import { Award, Rocket, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      value: '10+',
      label: 'Projects Delivered',
      detail: 'Enterprise-grade platforms and custom apps',
      icon: Rocket,
    },
    {
      value: '5+',
      label: 'Digital Solutions',
      detail: 'Full-cycle SaaS, mobile, and cloud suites',
      icon: Award,
    },
    {
      value: '100%',
      label: 'Commitment to Quality',
      detail: 'Rigorous engineering standards & SLA support',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#0B1D3A] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Subtle eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#4DA8FF]" />
            <span>Empowering Innovation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 font-['Poppins']">
            Your Technology Partner for the Digital Future.
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            At TECHMATE, we believe great ideas deserve great technology. We combine creativity, strategy, and software engineering to create digital experiences that solve real problems.
          </p>
        </div>

        {/* 3 Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#112B5F]/40 hover:bg-[#112B5F]/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#4DA8FF]/40 shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#1E63F3] shadow-xs flex items-center justify-center text-[#4DA8FF] group-hover:text-white transition-colors mb-5">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Big Metric Stat */}
                <div className="text-4xl sm:text-5xl font-extrabold text-white group-hover:text-[#4DA8FF] transition-colors mb-2 font-['Poppins']">
                  {stat.value}
                </div>

                {/* Metric Label */}
                <div className="text-base font-semibold text-white mb-1">
                  {stat.label}
                </div>

                {/* Detail */}
                <p className="text-xs text-slate-300 max-w-[240px]">
                  {stat.detail}
                </p>

                {/* Subtle bottom active line */}
                <div className="w-8 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#1E63F3] group-hover:to-[#4DA8FF] rounded-full mt-4 transition-all duration-300 group-hover:w-16" />
              </div>
            );
          })}
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-white/70 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4DA8FF]" />
            <span>Agile Sprint Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4DA8FF]" />
            <span>Modern Scalable Stacks</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4DA8FF]" />
            <span>Dedicated Tech Support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4DA8FF]" />
            <span>Transparent Communication</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TrustSection;
