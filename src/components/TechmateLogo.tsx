import React from 'react';

interface TechmateLogoProps {
  variant?: 'horizontal' | 'stacked' | 'mark';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

/**
 * TECHMATE Official Brand Logo
 * Pixel-accurate vector representation matching brand identity guidelines:
 * - Ascending connected blocks: Technology + Connection + Growth
 * - 3 Connected rounded nodes in blue gradient (#0B1D3A -> #1E63F3 -> #4DA8FF)
 * - 3 Floating satellite digital blocks
 * - Distinctive "TECHMATE" typography with chevron 'A' (Λ) and gradient accent
 */
export const TechmateMark: React.FC<{
  size?: number;
  className?: string;
  idSuffix?: string;
}> = ({ size = 40, className = '', idSuffix = 'mark' }) => {
  const gradId = `techmateGrad_${idSuffix}`;
  const glowId = `techmateGlow_${idSuffix}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="TECHMATE Logo Mark"
    >
      <defs>
        <linearGradient id={gradId} x1="20" y1="180" x2="180" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B1D3A" />
          <stop offset="25%" stopColor="#112B5F" />
          <stop offset="65%" stopColor="#1E63F3" />
          <stop offset="100%" stopColor="#4DA8FF" />
        </linearGradient>
        <filter id={glowId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1E63F3" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main Connected Ascending Nodes */}
      <g filter={`url(#${glowId})`}>
        {/* Node 1: Bottom-Left */}
        <rect x="25" y="125" width="46" height="46" rx="12" fill={`url(#${gradId})`} />

        {/* Bridge 1: Between Node 1 and Node 2 */}
        <path
          d="M 60 125 
             C 60 105, 75 105, 75 85
             L 100 85
             C 100 105, 85 105, 85 125
             Z"
          fill={`url(#${gradId})`}
        />

        {/* Node 2: Center */}
        <rect x="70" y="76" width="48" height="48" rx="12" fill={`url(#${gradId})`} />

        {/* Bridge 2: Between Node 2 and Node 3 */}
        <path
          d="M 106 76 
             C 106 56, 120 56, 120 36
             L 146 36
             C 146 56, 132 56, 132 76
             Z"
          fill={`url(#${gradId})`}
        />

        {/* Node 3: Top-Right */}
        <rect x="115" y="26" width="46" height="46" rx="12" fill={`url(#${gradId})`} />
      </g>

      {/* Floating Satellite Blocks */}
      {/* Satellite 1: Top-Right tiny block */}
      <rect x="168" y="14" width="14" height="14" rx="4" fill="#4DA8FF" />

      {/* Satellite 2: Middle-Right medium block */}
      <rect x="138" y="94" width="22" height="22" rx="6" fill="#1E63F3" />

      {/* Satellite 3: Bottom-Right small block */}
      <rect x="166" y="124" width="13" height="13" rx="3.5" fill="#1E63F3" />
    </svg>
  );
};

export const TechmateLogo: React.FC<TechmateLogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const isDark = theme === 'dark';

  // Sizing definitions
  const markSizes = {
    sm: 30,
    md: 40,
    lg: 52,
    xl: 72,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl sm:text-5xl',
  };

  if (variant === 'mark') {
    return <TechmateMark size={markSizes[size]} className={className} idSuffix={`mark_${size}_${theme}`} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <TechmateMark size={markSizes[size] * 1.5} className="mb-3" idSuffix={`stacked_${size}_${theme}`} />
        
        {/* Wordmark */}
        <div className={`font-bold tracking-wider uppercase font-['Poppins'] flex items-center ${textSizes[size]}`}>
          <span className={isDark ? 'text-white' : 'text-[#0B1D3A]'}>TECH</span>
          <span className="bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] bg-clip-text text-transparent ml-1 inline-flex items-center">
            M
            <span className="inline-block transform scale-y-95 tracking-tighter">Λ</span>
            TE
          </span>
        </div>

        {showTagline && (
          <div className="mt-2 flex flex-col items-center space-y-1">
            <div className={`text-[10px] sm:text-xs tracking-[0.25em] font-semibold uppercase flex items-center gap-2 ${
              isDark ? 'text-slate-300' : 'text-[#112B5F]'
            }`}>
              <span className="w-4 h-[1px] bg-current opacity-40 inline-block"></span>
              <span>Building Software. Creating Possibilities.</span>
              <span className="w-4 h-[1px] bg-current opacity-40 inline-block"></span>
            </div>
            <div className="text-[9px] sm:text-[11px] tracking-[0.2em] font-medium text-[#1E63F3] flex items-center gap-1.5">
              <span>•</span>
              <span>TURNING IDEAS INTO DIGITAL REALITY.</span>
              <span>•</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <TechmateMark size={markSizes[size]} idSuffix={`horiz_${size}_${theme}`} />
      
      <div className="flex flex-col justify-center">
        <div className={`font-bold tracking-wider uppercase font-['Poppins'] leading-none flex items-center ${textSizes[size]}`}>
          <span className={isDark ? 'text-white' : 'text-[#0B1D3A]'}>TECH</span>
          <span className="bg-gradient-to-r from-[#1E63F3] to-[#4DA8FF] bg-clip-text text-transparent ml-0.5 inline-flex items-center">
            M<span className="inline-block transform scale-y-95">Λ</span>TE
          </span>
        </div>

        {showTagline && (
          <div className="mt-1">
            <p className={`text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase ${
              isDark ? 'text-slate-300' : 'text-[#112B5F]'
            }`}>
              Building Software. Creating Possibilities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default TechmateLogo;
