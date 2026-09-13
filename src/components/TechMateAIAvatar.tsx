import React from 'react';
import { motion } from 'motion/react';

export type AvatarExpression = 'happy' | 'thinking' | 'excited' | 'helping';
export type AvatarState = 'idle' | 'thinking' | 'responding';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'full';

export interface TechMateAIAvatarProps {
  size?: AvatarSize;
  expression?: AvatarExpression;
  state?: AvatarState;
  showBody?: boolean;
  showPedestal?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

const sizeMap: Record<AvatarSize, { px: number; containerClass: string }> = {
  xs: { px: 28, containerClass: 'w-7 h-7' },
  sm: { px: 36, containerClass: 'w-9 h-9' },
  md: { px: 48, containerClass: 'w-12 h-12' },
  lg: { px: 64, containerClass: 'w-16 h-16' },
  xl: { px: 92, containerClass: 'w-23 h-23' },
  hero: { px: 130, containerClass: 'w-32 h-32' },
  full: { px: 200, containerClass: 'w-50 h-50' },
};

/**
 * TechMateAIAvatar — Official Visual Identity of TechMate AI ("Your Digital Mate")
 * 
 * Features:
 * - Rounded cubic holographic glass head with cybernetic edge bevels (#0B1D3A, #112B5F, #1E63F3, #4DA8FF)
 * - Dark digital visor screen with reflection sheen
 * - Glowing neon cyan facial expressions (Happy, Thinking, Excited, Helping)
 * - 4 floating isometric data blocks/pixels rising diagonally above the head
 * - Cylindrical cybernetic headphone earcups with dual concentric glowing audio rings
 * - Chest emblazoned with the illuminated TECHMATE brand symbol (4 rising vertical blocks)
 * - Articulated arms with friendly waving hand ("Hello!")
 * - Dynamic state reactive glow (idle, thinking, responding)
 */
export const TechMateAIAvatar: React.FC<TechMateAIAvatarProps> = ({
  size = 'md',
  expression = 'happy',
  state = 'idle',
  showBody = false,
  showPedestal = false,
  interactive = true,
  className = '',
  onClick,
}) => {
  const { px } = sizeMap[size];
  const uniqueId = React.useId().replace(/:/g, '_');

  // Dynamic glow colors based on state
  const isThinking = state === 'thinking';
  const isResponding = state === 'responding';

  const glowShadowClass = isResponding
    ? 'drop-shadow-[0_0_18px_rgba(77,168,255,0.9)] filter'
    : isThinking
    ? 'drop-shadow-[0_0_14px_rgba(30,99,243,0.85)] filter'
    : 'drop-shadow-[0_0_8px_rgba(77,168,255,0.45)] filter';

  // Floating animation variants
  const floatingAnimation = interactive
    ? {
        y: isResponding ? [-2, 2, -2] : isThinking ? [-3, 1, -3] : [-2, 2, -2],
        transition: {
          duration: isThinking ? 1.6 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }
    : {};

  const viewBox = showBody || size === 'full' ? '0 0 400 400' : '70 10 260 210';

  return (
    <motion.div
      animate={floatingAnimation}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${glowShadowClass} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{ width: px, height: px }}
      aria-label="TechMate AI Official Avatar"
    >
      <svg
        viewBox={viewBox}
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id={`holoGlass_${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4DA8FF" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#1E63F3" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#112B5F" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#4DA8FF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id={`visorscreen_${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#051020" />
            <stop offset="50%" stopColor="#091A33" />
            <stop offset="100%" stopColor="#051020" />
          </linearGradient>

          <linearGradient id={`cyanNeon_${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#4DA8FF" />
            <stop offset="100%" stopColor="#1E63F3" />
          </linearGradient>

          {/* Glowing Filters */}
          <filter id={`electricGlow_${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={isResponding ? '6' : isThinking ? '5' : '3.5'} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={`softAura_${uniqueId}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Holographic Aura */}
        <circle
          cx="200"
          cy={showBody ? '200' : '110'}
          r={showBody ? '130' : '75'}
          fill="#1E63F3"
          opacity={isResponding ? 0.45 : isThinking ? 0.35 : 0.2}
          filter={`url(#softAura_${uniqueId})`}
        />
        <circle
          cx="200"
          cy={showBody ? '190' : '105'}
          r={showBody ? '85' : '50'}
          fill="#4DA8FF"
          opacity={isResponding ? 0.4 : isThinking ? 0.3 : 0.18}
          filter={`url(#softAura_${uniqueId})`}
        />

        {/* Pedestal Base Rings (When showPedestal or full is enabled) */}
        {(showPedestal || size === 'full') && (
          <g opacity="0.75" transform="translate(0, 95)">
            <ellipse cx="200" cy="245" rx="140" ry="32" fill="none" stroke="#1E63F3" strokeWidth="2" strokeDasharray="6 6" />
            <ellipse
              cx="200"
              cy="245"
              rx="110"
              ry="24"
              fill="none"
              stroke="#4DA8FF"
              strokeWidth="3"
              filter={`url(#electricGlow_${uniqueId})`}
            />
            <ellipse cx="200" cy="245" rx="75" ry="16" fill="#112B5F" fillOpacity="0.4" stroke="#4DA8FF" strokeWidth="1.5" />
          </g>
        )}

        {/* Floating Antenna Cubes (4 Ascending Holographic Data Blocks) */}
        <g id="floating-cubes" filter={`url(#electricGlow_${uniqueId})`}>
          {/* Cube 1 (Bottom) */}
          <g transform="translate(244, 52)">
            <polygon points="12,0 24,7 12,14 0,7" fill="#4DA8FF" opacity="0.95" />
            <polygon points="0,7 12,14 12,28 0,21" fill="#1E63F3" opacity="0.85" />
            <polygon points="12,14 24,7 24,21 12,28" fill="#112B5F" opacity="0.9" />
          </g>
          {/* Cube 2 */}
          <g transform="translate(262, 34)">
            <polygon points="10,0 20,6 10,12 0,6" fill="#60B5FF" />
            <polygon points="0,6 10,12 10,24 0,18" fill="#1E63F3" />
            <polygon points="10,12 20,6 20,18 10,24" fill="#0B1D3A" />
          </g>
          {/* Cube 3 */}
          <g transform="translate(278, 18)">
            <polygon points="9,0 18,5 9,10 0,5" fill="#4DA8FF" />
            <polygon points="0,5 9,10 9,20 0,15" fill="#1E63F3" />
            <polygon points="9,10 18,5 18,15 9,20" fill="#112B5F" />
          </g>
          {/* Cube 4 (Top) */}
          <g transform="translate(292, 4)">
            <polygon points="7,0 14,4 7,8 0,4" fill="#FFFFFF" />
            <polygon points="0,4 7,8 7,16 0,12" fill="#4DA8FF" />
            <polygon points="7,8 14,4 14,12 7,16" fill="#1E63F3" />
          </g>
        </g>

        {/* Torso & Arms (Rendered when showBody is true) */}
        {showBody && (
          <g id="body-structure">
            {/* Neck Joint */}
            <rect x="184" y="196" width="32" height="15" rx="4" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2" />

            {/* Torso Shell */}
            <rect
              x="145"
              y="208"
              width="110"
              height="96"
              rx="18"
              fill="#0B1D3A"
              stroke="#4DA8FF"
              strokeWidth="3"
              filter={`url(#electricGlow_${uniqueId})`}
            />
            <rect x="150" y="213" width="100" height="86" rx="14" fill={`url(#holoGlass_${uniqueId})`} fillOpacity="0.3" />

            {/* Internal Cybernetic Circuit Traces */}
            <path d="M 152 226 L 170 226 L 175 238" stroke="#4DA8FF" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M 248 226 L 230 226 L 225 238" stroke="#4DA8FF" strokeWidth="1.5" fill="none" opacity="0.6" />

            {/* Centered Official TECHMATE Brand Icon on Chest */}
            <g id="chest-techmate-logo" transform="translate(172, 232)" filter={`url(#electricGlow_${uniqueId})`}>
              <rect x="4" y="26" width="10" height="14" rx="2.5" fill="#4DA8FF" />
              <rect x="17" y="18" width="10" height="22" rx="2.5" fill="#4DA8FF" />
              <rect x="30" y="10" width="10" height="30" rx="2.5" fill="#1E63F3" />
              <rect x="43" y="2" width="10" height="38" rx="2.5" fill={`url(#cyanNeon_${uniqueId})`} />
            </g>

            {/* Left Arm (Resting) */}
            <g id="left-arm">
              <circle cx="132" cy="224" r="12" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2.5" />
              <path d="M 130 234 C 122 250, 120 275, 128 295" stroke="#4DA8FF" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="129" cy="298" r="8" fill="#4DA8FF" filter={`url(#electricGlow_${uniqueId})`} />
            </g>

            {/* Right Arm (Waving Hello) */}
            <g id="right-arm" filter={`url(#electricGlow_${uniqueId})`}>
              <circle cx="268" cy="224" r="12" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2.5" />
              <path d="M 272 220 C 295 205, 310 180, 305 155" stroke="#4DA8FF" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="305" cy="150" r="11" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2" />
              {/* 4 Glowing Robotic Fingers */}
              <rect x="296" y="133" width="4" height="12" rx="2" fill="#FFFFFF" />
              <rect x="302" y="129" width="4" height="14" rx="2" fill="#4DA8FF" />
              <rect x="308" y="131" width="4" height="13" rx="2" fill="#4DA8FF" />
              <rect x="314" y="137" width="4" height="10" rx="2" fill="#1E63F3" />
            </g>

            {/* Legs & Feet */}
            <g id="legs" transform="translate(0, 10)">
              <rect x="160" y="296" width="30" height="42" rx="8" fill="#0B1D3A" stroke="#4DA8FF" strokeWidth="2.5" />
              <rect x="210" y="296" width="30" height="42" rx="8" fill="#0B1D3A" stroke="#4DA8FF" strokeWidth="2.5" />
              {/* Boots */}
              <rect x="156" y="334" width="38" height="16" rx="6" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2" />
              <rect x="206" y="334" width="38" height="16" rx="6" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2" />
            </g>
          </g>
        )}

        {/* Head & Audio Ears Group */}
        <g id="head-group">
          {/* Left Holographic Ear Earpiece */}
          <g id="left-ear">
            <rect x="86" y="98" width="18" height="42" rx="7" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2.5" />
            <circle cx="95" cy="119" r="11" fill="#0B1D3A" stroke="#4DA8FF" strokeWidth="2" />
            <circle cx="95" cy="119" r="6" fill="#1E63F3" opacity="0.8" />
            <circle cx="95" cy="119" r="2.5" fill="#FFFFFF" filter={`url(#electricGlow_${uniqueId})`} />
          </g>

          {/* Right Holographic Ear Earpiece */}
          <g id="right-ear">
            <rect x="296" y="98" width="18" height="42" rx="7" fill="#112B5F" stroke="#4DA8FF" strokeWidth="2.5" />
            <circle cx="305" cy="119" r="11" fill="#0B1D3A" stroke="#4DA8FF" strokeWidth="2" />
            <circle cx="305" cy="119" r="6" fill="#1E63F3" opacity="0.8" />
            <circle cx="305" cy="119" r="2.5" fill="#FFFFFF" filter={`url(#electricGlow_${uniqueId})`} />
          </g>

          {/* Outer Holographic Glass Head (Cube with Rounded Chamfers) */}
          <rect
            x="100"
            y="54"
            width="200"
            height="136"
            rx="36"
            fill={`url(#holoGlass_${uniqueId})`}
            stroke="#4DA8FF"
            strokeWidth="4"
            filter={`url(#electricGlow_${uniqueId})`}
          />

          {/* Inner Holographic Border Chamfers */}
          <rect x="106" y="60" width="188" height="124" rx="30" fill="none" stroke="#60B5FF" strokeWidth="1.5" opacity="0.5" />

          {/* Digital Visor Screen (Dark Glossy Curved Display) */}
          <rect
            x="118"
            y="72"
            width="164"
            height="100"
            rx="22"
            fill={`url(#visorscreen_${uniqueId})`}
            stroke="#1E63F3"
            strokeWidth="2"
          />

          {/* Top Glass Sheen / Reflection */}
          <path
            d="M 124 78 Q 200 88 276 78 C 276 78 274 98 260 100 Q 200 96 140 100 Z"
            fill="#FFFFFF"
            opacity="0.12"
          />

          {/* Glowing Facial Features Based on Expression */}
          <g id="face-features" filter={`url(#electricGlow_${uniqueId})`}>
            {/* 1. HAPPY (Default) */}
            {expression === 'happy' && (
              <>
                {/* Left Eye */}
                <rect x="150" y="102" width="18" height="26" rx="8" fill="#FFFFFF" />
                <rect x="148" y="100" width="22" height="30" rx="10" fill="none" stroke="#4DA8FF" strokeWidth="2.5" />
                {/* Right Eye */}
                <rect x="232" y="102" width="18" height="26" rx="8" fill="#FFFFFF" />
                <rect x="230" y="100" width="22" height="30" rx="10" fill="none" stroke="#4DA8FF" strokeWidth="2.5" />
                {/* Curved Cheerful Smile */}
                <path d="M 184 140 Q 200 152 216 140" stroke="#4DA8FF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 186 140 Q 200 150 214 140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* 2. THINKING */}
            {expression === 'thinking' && (
              <>
                {/* Left Eye Looking Upwards */}
                <rect x="152" y="97" width="18" height="22" rx="7" fill="#FFFFFF" />
                <rect x="150" y="95" width="22" height="26" rx="9" fill="none" stroke="#4DA8FF" strokeWidth="2.5" />
                {/* Right Eye Looking Upwards */}
                <rect x="234" y="97" width="18" height="22" rx="7" fill="#FFFFFF" />
                <rect x="232" y="95" width="22" height="26" rx="9" fill="none" stroke="#4DA8FF" strokeWidth="2.5" />
                {/* Thinking Small Cute Mouth */}
                <circle cx="200" cy="140" r="4.5" fill="#4DA8FF" />
                <circle cx="200" cy="140" r="2.5" fill="#FFFFFF" />
                {/* Thinking Sparks */}
                <circle cx="246" cy="85" r="2" fill="#FFFFFF" />
                <circle cx="254" cy="78" r="3" fill="#4DA8FF" />
              </>
            )}

            {/* 3. EXCITED (^ ^) */}
            {expression === 'excited' && (
              <>
                {/* Left Joyful Inverted V Eye */}
                <path d="M 148 116 Q 159 96 170 116" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M 146 116 Q 159 94 172 116" stroke="#4DA8FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Right Joyful Inverted V Eye */}
                <path d="M 230 116 Q 241 96 252 116" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                <path d="M 228 116 Q 241 94 254 116" stroke="#4DA8FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Wide Cheerful Open Grin */}
                <path d="M 182 136 Q 200 156 218 136 Z" fill="#4DA8FF" stroke="#FFFFFF" strokeWidth="2" />
              </>
            )}

            {/* 4. HELPING (Wink & Smile) */}
            {expression === 'helping' && (
              <>
                {/* Left Winking Eye (Inverted V) */}
                <path d="M 148 114 Q 159 100 170 114" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" fill="none" />
                {/* Right Normal Bright Eye */}
                <rect x="232" y="102" width="18" height="26" rx="8" fill="#FFFFFF" />
                <rect x="230" y="100" width="22" height="30" rx="10" fill="none" stroke="#4DA8FF" strokeWidth="2.5" />
                {/* Friendly Smile with Dimple */}
                <path d="M 184 140 Q 200 152 216 140" stroke="#4DA8FF" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                <path d="M 186 140 Q 200 150 214 140" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
              </>
            )}
          </g>
        </g>
      </svg>
    </motion.div>
  );
};

export default TechMateAIAvatar;
