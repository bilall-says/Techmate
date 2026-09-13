import React, { useState } from 'react';
import { projectsData } from '../data/techmateData';
import { ProjectItem } from '../types';
import { ArrowUpRight, TrendingUp, Activity, ShoppingCart, ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';

interface FeaturedProjectsSectionProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'healthtech', label: 'Healthcare' },
    { id: 'ecommerce', label: 'E-Commerce' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.type === activeCategory);

  // Render high-fidelity realistic UI mockup visuals
  const renderProjectMockup = (project: ProjectItem) => {
    if (project.type === 'fintech') {
      return (
        <div className="w-full h-full bg-[#0B1D3A] p-5 text-white flex flex-col justify-between select-none relative overflow-hidden font-sans">
          {/* Mockup Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1E63F3]" />
              <span className="text-xs font-bold font-mono tracking-wider text-slate-200">NOVA CAPITAL // OS</span>
            </div>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded">
              ● REALTIME
            </span>
          </div>

          {/* Metric Row */}
          <div className="grid grid-cols-2 gap-3 my-4">
            <div className="bg-[#112B5F]/80 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-slate-400 font-medium">Total Portfolio Value</div>
              <div className="text-lg font-bold text-white tracking-tight">PKR 39,550,000</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> +14.2% MoM
              </div>
            </div>
            <div className="bg-[#112B5F]/80 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-slate-400 font-medium">Reconciled Volume</div>
              <div className="text-lg font-bold text-[#4DA8FF] tracking-tight">48,920 Tx</div>
              <div className="text-[10px] text-slate-300 mt-0.5">Latency: 38ms</div>
            </div>
          </div>

          {/* Graphical Sparkline Visual */}
          <div className="bg-[#112B5F]/50 p-3 rounded-xl border border-white/5 flex flex-col justify-end h-24">
            <div className="flex items-end justify-between gap-1.5 h-14 w-full">
              {[40, 55, 35, 65, 50, 75, 60, 90, 85, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[#1E63F3] to-[#4DA8FF] rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1.5">
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>20:00</span>
            </div>
          </div>
        </div>
      );
    }

    if (project.type === 'healthtech') {
      return (
        <div className="w-full h-full bg-[#0d2242] p-5 text-white flex flex-col justify-between select-none relative overflow-hidden font-sans">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#4DA8FF]" />
              <span className="text-xs font-bold font-mono tracking-wider text-slate-200">HEALTHCONNECT // TELEMETRY</span>
            </div>
            <span className="text-[10px] bg-[#1E63F3]/30 text-[#4DA8FF] font-mono px-2 py-0.5 rounded flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> HIPAA SECURE
            </span>
          </div>

          {/* Vitals Feed */}
          <div className="grid grid-cols-2 gap-3 my-3">
            <div className="bg-[#112B5F]/80 p-3 rounded-xl border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Pulse Rate</span>
                <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              </div>
              <div className="text-lg font-bold text-white tracking-tight mt-1">72 <span className="text-xs font-normal text-slate-400">BPM</span></div>
              <div className="text-[10px] text-emerald-400">Normal Sinus</div>
            </div>

            <div className="bg-[#112B5F]/80 p-3 rounded-xl border border-white/5">
              <div className="text-[10px] text-slate-400 font-medium">O₂ Saturation</div>
              <div className="text-lg font-bold text-[#4DA8FF] tracking-tight mt-1">99%</div>
              <div className="text-[10px] text-slate-300">Optimal Range</div>
            </div>
          </div>

          {/* Doctor Consult Card */}
          <div className="bg-[#112B5F]/60 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#4DA8FF]/20 text-[#4DA8FF] flex items-center justify-center text-xs font-bold">
                DR
              </div>
              <div>
                <div className="text-xs font-bold text-white">Dr. Sarah Adams, MD</div>
                <div className="text-[10px] text-slate-400">Cardiology Consultation • 10:30 AM</div>
              </div>
            </div>
            <span className="text-[10px] font-semibold bg-emerald-500 text-white px-2 py-1 rounded">
              Ready
            </span>
          </div>
        </div>
      );
    }

    // E-commerce (ShopSphere)
    return (
      <div className="w-full h-full bg-[#08172e] p-5 text-white flex flex-col justify-between select-none relative overflow-hidden font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1E63F3]" />
            <span className="text-xs font-bold font-mono tracking-wider text-slate-200">SHOPSPHERE // STORE ENGINE</span>
          </div>
          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono px-2 py-0.5 rounded flex items-center gap-1">
            <ShoppingCart className="w-3 h-3" /> FAST CHECKOUT
          </span>
        </div>

        {/* Sales & Orders */}
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="bg-[#112B5F]/80 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-slate-400 font-medium">Daily Revenue</div>
            <div className="text-lg font-bold text-white tracking-tight mt-1">PKR 125,000</div>
            <div className="text-[10px] text-emerald-400 font-medium">+34% vs avg</div>
          </div>
          <div className="bg-[#112B5F]/80 p-3 rounded-xl border border-white/5">
            <div className="text-[10px] text-slate-400 font-medium">Cart Conversion</div>
            <div className="text-lg font-bold text-[#4DA8FF] tracking-tight mt-1">4.82%</div>
            <div className="text-[10px] text-slate-300">Target: 3.2%</div>
          </div>
        </div>

        {/* Live SKU Status */}
        <div className="bg-[#112B5F]/60 p-3 rounded-xl border border-white/5">
          <div className="flex justify-between items-center text-[10px] text-slate-300 mb-1">
            <span>Global Inventory Sync</span>
            <span className="text-emerald-400">99.8% Synchronized</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] h-full w-[94%]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
              <span>Featured Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight font-['Poppins']">
              Ideas Turned Into Reality.
            </h2>
            <p className="text-base text-white/70 mt-2 max-w-xl">
              Explore how we engineer cutting-edge software solutions that power industry leaders and fast-growing innovators.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1E63F3] text-white shadow-xl shadow-blue-500/20 border border-white/10'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            return (
              <div
                key={project.id}
                className="group bg-[#112B5F]/40 hover:bg-[#112B5F]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#4DA8FF]/40 shadow-xl transition-all duration-300 flex flex-col justify-between text-white"
              >
                {/* Visual Mockup Preview */}
                <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-[#0B1D3A] border-b border-white/10">
                  {renderProjectMockup(project)}
                  <div className="absolute top-3 left-3 bg-[#0B1D3A]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-white font-semibold border border-white/10">
                    Project 0{idx + 1}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#4DA8FF] tracking-wide uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-[#4DA8FF] transition-colors mb-2 font-['Poppins'] flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#4DA8FF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </h3>

                    <p className="text-sm text-white/70 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Metrics preview */}
                    <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#0B1D3A]/80 rounded-xl mb-6 border border-white/10">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="text-center">
                          <div className="text-xs font-bold text-[#4DA8FF] font-['Poppins']">{m.value}</div>
                          <div className="text-[10px] text-slate-400 leading-tight">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags and CTA */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject && onSelectProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-white/5 hover:bg-[#1E63F3] rounded-xl border border-white/10 hover:border-[#1E63F3] transition-all duration-200 cursor-pointer"
                    >
                      <span>Explore Case Architecture</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default FeaturedProjectsSection;
