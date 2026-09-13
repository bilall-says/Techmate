import React, { useState } from 'react';
import { processSteps } from '../data/techmateData';
import { Search, Compass, Cpu, Rocket, Check, ArrowRight, Sparkles } from 'lucide-react';
import { TechmateMark } from './TechmateLogo';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Search className="w-5 h-5" />;
      case 1:
        return <Compass className="w-5 h-5" />;
      case 2:
        return <Cpu className="w-5 h-5" />;
      case 3:
        return <Rocket className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <span>Our Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 font-['Poppins']">
            From Idea to Digital Reality.
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            A structured, transparent four-stage delivery model inspired by the ascending geometry of our brand.
          </p>
        </div>

        {/* Connected Timeline Progress Line (Desktop) */}
        <div className="hidden lg:block relative mb-12">
          {/* Base Connection Track */}
          <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1 bg-white/10 rounded-full z-0" />
          
          {/* Active Gradient Track */}
          <div
            className="absolute top-1/2 left-10 -translate-y-1/2 h-1 bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] rounded-full transition-all duration-500 z-0"
            style={{ width: `${(activeStepIndex / (processSteps.length - 1)) * 90}%` }}
          />

          <div className="grid grid-cols-4 gap-4 relative z-10">
            {processSteps.map((step, idx) => {
              const isSelected = activeStepIndex === idx;
              const isPast = idx <= activeStepIndex;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Circular Node */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-tr from-[#1E63F3] to-[#4DA8FF] text-white scale-110 shadow-lg ring-4 ring-[#1E63F3]/30'
                        : isPast
                        ? 'bg-[#112B5F] text-white border border-white/10'
                        : 'bg-white/5 text-slate-400 border border-white/10 group-hover:border-[#4DA8FF]'
                    }`}
                  >
                    {getStepIcon(idx)}
                  </div>

                  {/* Step Number & Title */}
                  <div className="mt-3">
                    <div className="text-[11px] font-mono font-bold text-[#4DA8FF] uppercase tracking-wider">
                      {step.step}
                    </div>
                    <div className="text-base font-bold text-white font-['Poppins']">
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Spotlight Box */}
        <div className="bg-[#112B5F]/40 backdrop-blur-md rounded-2xl p-8 sm:p-10 border border-white/10 shadow-2xl max-w-4xl mx-auto text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#4DA8FF] uppercase tracking-wider mb-2">
                <span>{processSteps[activeStepIndex].step}</span>
                <span>•</span>
                <span>Milestone Stage</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-['Poppins']">
                {processSteps[activeStepIndex].title}
              </h3>

              <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                {processSteps[activeStepIndex].description}
              </p>

              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Key Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {processSteps[activeStepIndex].deliverables.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-200 bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <Check className="w-3.5 h-3.5 text-[#4DA8FF] shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Icon / Logo Connection */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-[#0B1D3A]/80 rounded-2xl border border-white/10 text-center">
              <TechmateMark size={80} idSuffix={`process_step_${activeStepIndex}`} className="mb-4 drop-shadow-[0_4px_15px_rgba(30,99,243,0.4)]" />
              <div className="text-xs font-mono text-slate-400">Connected Process</div>
              <div className="text-sm font-bold text-white font-['Poppins']">
                Phase {activeStepIndex + 1} of 4
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1 text-xs rounded bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={activeStepIndex === processSteps.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(processSteps.length - 1, prev + 1))}
                  className="px-3 py-1 text-xs rounded bg-[#1E63F3] text-white disabled:opacity-30 hover:bg-blue-600 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View: Vertical Connected Steps */}
        <div className="lg:hidden mt-8 space-y-4">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-[#112B5F] border-[#4DA8FF] shadow-lg text-white'
                  : 'bg-[#112B5F]/40 border-white/10 text-white/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-[#4DA8FF] flex items-center justify-center font-bold text-xs">
                  {step.number}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#4DA8FF] uppercase">{step.step}</div>
                  <div className="text-sm font-bold text-white">{step.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProcessSection;
