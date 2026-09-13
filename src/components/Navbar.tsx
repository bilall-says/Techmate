import React, { useState, useEffect } from 'react';
import { TechmateLogo } from './TechmateLogo';
import { Menu, X, ArrowUpRight, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenBrandKit?: () => void;
  onNavigateContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBrandKit, onNavigateContact }) => {
  const { language, toggleLanguage, t, isUrdu } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section calculation
      const sections = ['home', 'about', 'services', 'projects', 'technologies', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('navHome'), href: '#home', id: 'home' },
    { label: t('navAbout'), href: '#about', id: 'about' },
    { label: t('navServices'), href: '#services', id: 'services' },
    { label: t('navProjects'), href: '#projects', id: 'projects' },
    { label: t('navTechStack'), href: '#technologies', id: 'technologies' },
    { label: t('navFaq'), href: '#faq', id: 'faq' },
    { label: t('navContact'), href: '#contact', id: 'contact' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B1D3A]/90 backdrop-blur-md shadow-xl shadow-black/30 border-b border-white/10 py-3.5'
          : 'bg-[#0B1D3A]/70 backdrop-blur-sm py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#home');
              }}
              className="flex items-center group transition-transform active:scale-95"
              aria-label="TECHMATE Home"
            >
              <TechmateLogo variant="horizontal" theme="dark" size="md" />
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.href)}
                  className={`px-3 xl:px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-[#112B5F] border border-white/15 shadow-inner'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons: Language Switcher, Brand Kit & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#112B5F]/80 border border-white/10 hover:border-[#4DA8FF]/50 text-white transition-all cursor-pointer shadow-sm group"
              title={isUrdu ? 'Switch to English' : 'اردو میں دیکھیں'}
              aria-label="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#4DA8FF] transition-transform group-hover:rotate-45" />
              <span className="font-mono text-[11px] tracking-wider uppercase">
                {language === 'en' ? 'EN' : 'اردو'}
              </span>
              <span className="text-[10px] text-slate-400 group-hover:text-white transition-colors">
                | {language === 'en' ? 'اردو' : 'EN'}
              </span>
            </button>

            {onOpenBrandKit && (
              <button
                type="button"
                onClick={onOpenBrandKit}
                className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                title="View TECHMATE Official Brand Identity Sheet"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#4DA8FF]" />
                {t('navBrandKit')}
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                if (onNavigateContact) {
                  onNavigateContact();
                } else {
                  scrollTo('#contact');
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wide text-white bg-[#1E63F3] hover:bg-blue-600 rounded-full shadow-xl shadow-blue-500/25 border border-white/10 transition-all active:scale-98 cursor-pointer group"
            >
              <span>{t('navConsult')}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu & Language Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#112B5F] border border-white/10 text-white flex items-center gap-1.5"
              aria-label="Toggle language mobile"
            >
              <Globe className="w-3 h-3 text-[#4DA8FF]" />
              <span>{language === 'en' ? 'اردو' : 'EN'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B1D3A] border-b border-white/10 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.href)}
                className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'text-white bg-[#112B5F] border border-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white"
              >
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#4DA8FF]" />
                  <span>Language / زبان</span>
                </span>
                <span className="font-mono text-[#4DA8FF] uppercase font-bold">
                  {language === 'en' ? 'Switch to اردو' : 'Switch to EN'}
                </span>
              </button>

              {onOpenBrandKit && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrandKit();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/5 border border-white/10 rounded-xl"
                >
                  <Sparkles className="w-4 h-4 text-[#4DA8FF]" />
                  {t('navBrandKit')}
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollTo('#contact');
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold tracking-wide text-white bg-[#1E63F3] hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 border border-white/10"
              >
                <span>{t('navConsult')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;

