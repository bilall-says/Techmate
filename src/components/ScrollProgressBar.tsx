import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
        setIsVisible(scrollTop > 40);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Background track */}
      <div className="w-full h-full bg-black/20 backdrop-blur-xs">
        {/* Progress Fill */}
        <div
          className="h-full bg-gradient-to-r from-[#1E63F3] via-[#4DA8FF] to-[#38BDF8] relative transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(77,168,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Luminous Leading Glow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#4DA8FF] rounded-full blur-[2px] shadow-[0_0_8px_#38BDF8]" />
        </div>
      </div>
    </div>
  );
};

export default ScrollProgressBar;
