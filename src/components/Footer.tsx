import React from 'react';
import { TechmateLogo } from './TechmateLogo';
import { ArrowUp, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onOpenBrandKit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandKit }) => {
  const { language, toggleLanguage, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1D3A] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute inset-0 tech-grid-pattern-dark opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1E63F3]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Taglines */}
          <div className="lg:col-span-5 space-y-5">
            <TechmateLogo variant="horizontal" theme="dark" size="lg" />
            
            <div className="space-y-2 pt-2">
              <p className="text-sm font-semibold tracking-wider text-[#4DA8FF] uppercase font-['Poppins']">
                Building Software. Creating Possibilities.
              </p>
              <p className="text-sm text-slate-300 max-w-sm leading-relaxed font-normal">
                Turning Ideas Into Digital Reality. A modern technology company engineering high-impact digital products, scalable cloud architectures, and intuitive mobile solutions.
              </p>
            </div>

            {onOpenBrandKit && (
              <button
                type="button"
                onClick={onOpenBrandKit}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                <span>View Brand Identity Kit</span>
                <span className="text-[#4DA8FF]">→</span>
              </button>
            )}
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-['Poppins']">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#home" className="hover:text-[#4DA8FF] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#4DA8FF] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#4DA8FF] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#4DA8FF] transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#4DA8FF] transition-colors">
                  Process
                </a>
              </li>
              <li>
                <a href="#technologies" className="hover:text-[#4DA8FF] transition-colors">
                  Technologies
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#4DA8FF] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#4DA8FF] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-['Poppins']">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#services" className="hover:text-[#4DA8FF] transition-colors">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#4DA8FF] transition-colors">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#4DA8FF] transition-colors">
                  Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#4DA8FF] transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#4DA8FF] transition-colors">
                  Cloud Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media & Global Office */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-['Poppins']">
              Connect
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pakistan <br />
              <a href="mailto:sheikhbilal04888@gmail.com" className="text-[#4DA8FF] hover:underline transition-colors">
                sheikhbilal04888@gmail.com
              </a>
              <br />
              <a href="tel:+923224787839" className="text-slate-300 hover:text-white hover:underline transition-colors">
                +92 3224787839
              </a>
            </p>

            {/* Social Icons: LinkedIn, Instagram, Facebook, GitHub */}
            <div className="flex items-center gap-2.5 pt-2">
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TECHMATE LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1E63F3] text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TECHMATE Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1E63F3] text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TECHMATE Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1E63F3] text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TECHMATE GitHub"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#1E63F3] text-slate-300 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div>
            &copy; 2026 TECHMATE. {t('footerRights')}
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden md:inline">{t('footerTagline')}</span>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#4DA8FF]" />
              <span className="font-mono text-[11px] uppercase">{language === 'en' ? 'English' : 'اردو'}</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
