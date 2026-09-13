import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Download, Layers, Bot } from 'lucide-react';
import { TechmateLogo, TechmateMark } from './TechmateLogo';
import { TechMateAIAvatar } from './TechMateAIAvatar';

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({ isOpen, onClose }) => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!isOpen) return null;

  const brandColors = [
    { name: 'Deep Navy', hex: '#0B1D3A', role: 'Primary Dark & Main Text', textDark: false },
    { name: 'Navy Blue', hex: '#112B5F', role: 'Secondary Dark & Cards', textDark: false },
    { name: 'Technology Blue', hex: '#1E63F3', role: 'Primary Accent & Buttons', textDark: false },
    { name: 'Light Blue', hex: '#4DA8FF', role: 'Gradients & Highlights', textDark: true },
    { name: 'Light Background', hex: '#F2F6FA', role: 'Canvas Background', textDark: true },
    { name: 'White', hex: '#FFFFFF', role: 'Surface & High Contrast', textDark: true },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B1D3A] rounded-3xl shadow-2xl border border-white/10 overflow-hidden my-8 max-h-[90vh] flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#112B5F]/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1E63F3] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                TECHMATE Brand Identity Guidelines
              </h3>
              <p className="text-xs text-white/60">
                Official Colors, Typography, Symbol Architecture &amp; Assets
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Brand Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Logo Variations Showcase */}
          <div>
            <h4 className="text-xs font-bold text-[#4DA8FF] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#4DA8FF]" />
              <span>Official Logo Variations</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Light Variant */}
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono text-slate-400 mb-4 uppercase tracking-wider">Primary Horizontal (Light Canvas)</span>
                <TechmateLogo variant="horizontal" theme="light" size="md" showTagline={true} />
              </div>

              {/* Dark Variant */}
              <div className="bg-[#112B5F]/60 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center text-white">
                <span className="text-[10px] font-mono text-slate-400 mb-4 uppercase tracking-wider">Primary Horizontal (Dark Canvas)</span>
                <TechmateLogo variant="horizontal" theme="dark" size="md" showTagline={true} />
              </div>
            </div>
          </div>

          {/* Color Palette with 1-click copy */}
          <div>
            <h4 className="text-xs font-bold text-[#4DA8FF] uppercase tracking-wider mb-4">
              Brand Color System (Click to copy hex)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {brandColors.map((color) => {
                const isCopied = copiedColor === color.hex;
                return (
                  <button
                    key={color.name}
                    onClick={() => handleCopy(color.hex)}
                    className="group text-left p-3 rounded-xl border border-white/10 bg-[#112B5F]/40 hover:bg-[#112B5F]/80 hover:border-[#4DA8FF]/50 transition-all cursor-pointer flex flex-col justify-between h-28"
                  >
                    <div
                      className="w-full h-8 rounded-lg mb-2 shadow-inner border border-white/10 flex items-center justify-end pr-1.5"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isCopied && (
                        <span className="bg-emerald-500 text-white p-0.5 rounded text-[10px]">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white truncate">{color.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                        <span>{color.hex}</span>
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#4DA8FF]" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symbol Meaning & Typography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#112B5F]/40 border border-white/10">
              <h4 className="text-xs font-bold text-[#4DA8FF] uppercase tracking-wider mb-3">
                Brand Mark Formula
              </h4>
              <div className="flex items-center gap-4 mb-4">
                <TechmateMark size={56} idSuffix="modal_concept" />
                <div className="text-xs text-white/80 leading-relaxed font-normal">
                  <span className="font-bold text-[#1E63F3]">T</span> (Technology) + <span className="font-bold text-[#4DA8FF]">Connection</span> (Network) + <span className="font-bold text-white">Growth</span> (Ascent) = TECHMATE Symbol.
                </div>
              </div>
              <ul className="text-xs text-white/70 space-y-1.5 list-disc pl-4 font-normal">
                <li>Represents continuous progress and climbing milestones</li>
                <li>Diagonal ascending nodes symbolize digital transformation</li>
                <li>Floating satellite squares represent modular software possibilities</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#112B5F]/40 border border-white/10">
              <h4 className="text-xs font-bold text-[#4DA8FF] uppercase tracking-wider mb-3">
                Typography System
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-mono text-[#4DA8FF]">Primary Font Family</div>
                  <div className="text-xl font-bold text-white font-['Poppins']">
                    Poppins (Google Font)
                  </div>
                </div>
                <div className="text-xs text-white/70 space-y-1">
                  <div>• <span className="font-bold text-white">Bold / SemiBold (600/700)</span>: Confident Headings</div>
                  <div>• <span className="font-medium text-white">Medium (500)</span>: Subheadings &amp; Buttons</div>
                  <div>• <span className="font-normal">Regular (400)</span>: High-Legibility Body Text</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Official TechMate AI Avatar & Assistant Guidelines */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#112B5F]/70 via-[#0B1D3A] to-[#112B5F]/70 border border-[#1E63F3]/40 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E63F3]/20 border border-[#4DA8FF]/40 flex items-center justify-center text-[#4DA8FF]">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-['Poppins']">
                    Official AI Assistant Identity: TechMate AI
                  </h4>
                  <p className="text-xs text-slate-300">
                    Character Appearance, Digital Visor, Facial Expressions &amp; Holographic System
                  </p>
                </div>
              </div>

              <a
                href="/assets/techmate-ai-avatar.svg"
                download="techmate-ai-avatar.svg"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#1E63F3] hover:bg-blue-600 rounded-xl shadow-md transition-all self-start sm:self-auto cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Avatar Vector</span>
              </a>
            </div>

            {/* Expression Matrix Showcase */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#4DA8FF] mb-3">
                Emotional State Expressions
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0B1D3A] p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-2 flex items-center justify-center">
                    <TechMateAIAvatar size="lg" expression="happy" state="idle" interactive={false} />
                  </div>
                  <span className="text-xs font-bold text-white">Happy (Default)</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Welcoming &amp; Friendly</span>
                </div>

                <div className="bg-[#0B1D3A] p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-2 flex items-center justify-center">
                    <TechMateAIAvatar size="lg" expression="thinking" state="thinking" interactive={false} />
                  </div>
                  <span className="text-xs font-bold text-white">Thinking</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Processing Logic</span>
                </div>

                <div className="bg-[#0B1D3A] p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-2 flex items-center justify-center">
                    <TechMateAIAvatar size="lg" expression="excited" state="responding" interactive={false} />
                  </div>
                  <span className="text-xs font-bold text-white">Excited</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Project Kickoff &amp; Win</span>
                </div>

                <div className="bg-[#0B1D3A] p-4 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-2 flex items-center justify-center">
                    <TechMateAIAvatar size="lg" expression="helping" state="idle" interactive={false} />
                  </div>
                  <span className="text-xs font-bold text-white">Helping</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Guiding Solutions</span>
                </div>
              </div>
            </div>

            {/* Anatomy Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1">1. Glass Cube Head &amp; Visor</div>
                <p className="text-[11px] leading-relaxed">
                  Chamfered rounded cube crafted in semi-transparent holographic blue glass with dark glossy visor display.
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1">2. Ascending Data Blocks</div>
                <p className="text-[11px] leading-relaxed">
                  Four isometric data cubes hovering diagonally above the head in gradient blues representing cloud intelligence.
                </p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="font-bold text-white mb-1">3. Chest Brand Mark</div>
                <p className="text-[11px] leading-relaxed">
                  Illuminated TECHMATE bar chart emblem centered on the chest, glowing in #4DA8FF and #1E63F3.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#112B5F]/40 flex items-center justify-between">
          <span className="text-xs text-white/60">
            &copy; 2026 TECHMATE Brand Identity Specification
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-[#0B1D3A] bg-white hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Close Guidelines
          </button>
        </div>
      </div>
    </div>
  );
};
export default BrandModal;
