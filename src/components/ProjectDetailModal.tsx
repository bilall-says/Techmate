import React from 'react';
import { ProjectItem } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, Building2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onStartSimilar,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#0B1D3A] rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-8 max-h-[90vh] flex flex-col text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#112B5F]/50 text-white">
          <div>
            <span className="text-[11px] font-mono text-[#4DA8FF] tracking-wider uppercase">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Poppins'] text-white">
              {project.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Project Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div>
            <h4 className="text-base font-semibold text-[#4DA8FF] mb-1 font-['Poppins']">
              {project.subtitle}
            </h4>
            <p className="text-sm text-white/70 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#112B5F]/40 rounded-2xl border border-white/10">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-base sm:text-xl font-extrabold text-[#4DA8FF] font-['Poppins']">
                  {metric.value}
                </div>
                <div className="text-[11px] font-medium text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Features */}
          <div>
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              Core Technical Deliverables
            </h5>
            <div className="space-y-2.5">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#4DA8FF] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Metadata Meta Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl text-xs">
              <Building2 className="w-4 h-4 text-[#4DA8FF]" />
              <div>
                <span className="text-slate-400 block">Client Partner</span>
                <span className="font-semibold text-white">{project.client}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl text-xs">
              <Clock className="w-4 h-4 text-[#4DA8FF]" />
              <div>
                <span className="text-slate-400 block">Delivery Velocity</span>
                <span className="font-semibold text-white">{project.timeline}</span>
              </div>
            </div>
          </div>

          {/* Technology Badges */}
          <div>
            <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Technology Stack
            </h5>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 text-slate-300 text-xs font-mono rounded-lg border border-white/5 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#112B5F]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/70">
            Interested in a similar architecture for your organization?
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onStartSimilar(project.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] hover:from-[#112B5F] hover:to-[#1E63F3] rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            <span>Build Similar Solution</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProjectDetailModal;
