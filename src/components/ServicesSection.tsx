import React, { useState } from 'react';
import { servicesData } from '../data/techmateData';
import { ServiceItem } from '../types';
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Palette, 
  Cloud, 
  Bot, 
  ArrowUpRight, 
  Check,
  Layers
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-6 h-6" />;
      case 'Globe':
        return <Globe className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Palette':
        return <Palette className="w-6 h-6" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6" />;
      case 'Bot':
        return <Bot className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <span>Capabilities &amp; Solutions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 font-['Poppins']">
            What We Build
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            From specialized enterprise architectures to fluid multiplatform applications, we engineer solutions designed to scale with your ambitions.
          </p>
        </div>

        {/* 6 Modern Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            return (
              <div
                key={service.id}
                className="group relative bg-[#112B5F]/40 hover:bg-[#112B5F]/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 hover:border-[#1E63F3]/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between text-white"
              >
                {/* Top bar with icon and category tag */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#4DA8FF] group-hover:bg-[#1E63F3] group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-xs">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-300 uppercase tracking-wider bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#4DA8FF] transition-colors mb-3 font-['Poppins']">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Key Features list */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-white/60">
                        <Check className="w-3.5 h-3.5 text-[#4DA8FF] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tech tags & CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService(service.title);
                      } else {
                        setSelectedService(service);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#4DA8FF] hover:text-white transition-colors group/btn cursor-pointer"
                    title={`Start inquiry for ${service.title}`}
                  >
                    <span>Build This</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Service Guarantee Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#112B5F] to-[#0B1D3A] rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1E63F3] to-[#4DA8FF] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-['Poppins']">
                Need a Custom Architectural Consultation?
              </h4>
              <p className="text-xs sm:text-sm text-white/70">
                Our lead engineers review your technical requirements and suggest the optimal architecture stack.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="shrink-0 px-6 py-3 text-xs sm:text-sm font-bold text-[#0B1D3A] bg-white hover:bg-slate-100 rounded-xl transition-all shadow-md cursor-pointer"
          >
            Consult With Our Engineers
          </a>
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
