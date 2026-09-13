import React, { useState } from 'react';
import { technologiesData } from '../data/techmateData';
import { 
  Atom, 
  Layers, 
  Code, 
  FileCode, 
  Server, 
  Terminal, 
  Smartphone, 
  Flame, 
  Cloud, 
  Sparkles, 
  CheckCircle2,
  Cpu
} from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'Cloud & AI'];

  const filteredTech = activeCategory === 'All'
    ? technologiesData
    : technologiesData.filter((t) => t.category === activeCategory);

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-6 h-6 text-[#1E63F3]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#0B1D3A]" />;
      case 'Code':
        return <Code className="w-6 h-6 text-[#1E63F3]" />;
      case 'FileCode':
        return <FileCode className="w-6 h-6 text-amber-500" />;
      case 'Server':
        return <Server className="w-6 h-6 text-emerald-600" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-[#112B5F]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#4DA8FF]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-500" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-[#1E63F3]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      default:
        return <Cpu className="w-6 h-6 text-[#1E63F3]" />;
    }
  };

  return (
    <section id="technologies" className="py-24 md:py-32 bg-[#0B1D3A] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#112B5F] border border-white/10 text-[#4DA8FF] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <span>Engineering Stack</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 font-['Poppins']">
            Built With Modern Technology.
          </h2>

          <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
            We use proven, future-proof frameworks and cloud architectures that ensure high reliability, enterprise security, and blazing velocity.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E63F3] text-white shadow-xl shadow-blue-500/20 border border-white/10'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="group bg-[#112B5F]/40 hover:bg-[#112B5F]/80 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:border-[#4DA8FF]/40 shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between text-white"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 shadow-xs flex items-center justify-center transition-colors">
                    {getTechIcon(tech.icon)}
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#4DA8FF] bg-[#1E63F3]/20 border border-white/10 px-2 py-0.5 rounded">
                    {tech.level}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#4DA8FF] transition-colors mb-1 font-['Poppins']">
                  {tech.name}
                </h3>

                <p className="text-[11px] text-white/60 line-clamp-2 mb-3">
                  {tech.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>{tech.category}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#4DA8FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Benchmark Strip */}
        <div className="mt-14 p-6 bg-gradient-to-r from-[#112B5F] to-[#0B1D3A] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-[#4DA8FF]" />
            <div>
              <div className="text-sm font-bold font-['Poppins']">Zero Technical Debt Guarantee</div>
              <div className="text-xs text-slate-300">All codebases follow strict linting, automated CI testing, and containerized Docker environments.</div>
            </div>
          </div>
          <div className="text-xs font-mono text-[#4DA8FF] bg-white/10 px-3 py-1.5 rounded-lg shrink-0 border border-white/10">
            Node 22 LTS • React 19 • Cloud Native
          </div>
        </div>
      </div>
    </section>
  );
};
export default TechnologySection;
