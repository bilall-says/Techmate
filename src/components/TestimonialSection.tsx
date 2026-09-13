import React from 'react';
import { testimonialsData } from '../data/techmateData';
import { Star, Quote } from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <span>Client Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 font-['Poppins']">
            Trusted by Forward-Thinking Leaders.
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            Real experiences from founders and engineering directors who partnered with TECHMATE to turn ideas into digital reality.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-[#112B5F]/40 hover:bg-[#112B5F]/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#4DA8FF]/40 shadow-xl transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 text-white"
            >
              <div>
                {/* Quote icon and star ratings */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-[#4DA8FF] flex items-center justify-center group-hover:bg-[#1E63F3] group-hover:text-white transition-colors">
                    <Quote className="w-4 h-4" />
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-full text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs border border-white/15"
                  style={{ backgroundColor: item.avatarBg }}
                >
                  {item.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-['Poppins']">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.position}, <span className="font-semibold text-[#4DA8FF]">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialSection;
