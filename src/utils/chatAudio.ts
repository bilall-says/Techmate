/**
 * TECHMATE AI — Modern SaaS Audio Synthesis Engine
 * 
 * Crafted following modern product design philosophy (Linear, Slack, Raycast, Intercom):
 * - Organic, warm sine & triangle waveforms
 * - Lowpass biquad filtering to remove harsh frequencies
 * - Zero-click exponential envelope shaping with soft attack
 * - Controlled subtle gain (~0.03 - 0.045) for non-fatiguing ear comfort
 * - Shared singleton AudioContext with automatic gesture resumption
 */

let sharedAudioContext: AudioContext | null = null;

/**
 * Lazily obtains or resumes the singleton AudioContext.
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtxClass) return null;

    if (!sharedAudioContext || sharedAudioContext.state === 'closed') {
      sharedAudioContext = new AudioCtxClass();
    }

    if (sharedAudioContext.state === 'suspended') {
      sharedAudioContext.resume().catch(() => {
        // Silently handle autoplay restriction until next gesture
      });
    }

    return sharedAudioContext;
  } catch {
    return null;
  }
}

/**
 * Pre-warms / resumes the audio context upon user gesture.
 */
export function unlockAudioContext(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
}

/**
 * 1. SEND MESSAGE SOUND (Tactile, crisp upward micro-pop)
 * Evokes the feeling of dispatching a message into the cloud.
 * Upward pitch glide from 440 Hz (A4) to 660 Hz (E5) with smooth decay.
 */
export function playSendMessageSound(enabled = true): void {
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Master gain node
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    // Fast 6ms attack to prevent speaker click
    masterGain.gain.linearRampToValueAtTime(0.038, now + 0.006);
    // Smooth exponential decay
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

    // Warm lowpass filter to soften edge
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, now);

    // Primary ascending tone (sine wave)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.05);

    // Secondary subtle harmonic (triangle wave for body warmth)
    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(210, now);
    subOsc.frequency.exponentialRampToValueAtTime(340, now + 0.05);

    const subGain = ctx.createGain();
    subGain.gain.setValueAtTime(0.015, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    // Connect nodes
    osc.connect(masterGain);
    subOsc.connect(subGain);
    subGain.connect(masterGain);

    masterGain.connect(filter);
    filter.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);

    osc.stop(now + 0.12);
    subOsc.stop(now + 0.12);
  } catch {
    // Graceful fallback
  }
}

/**
 * 2. RECEIVE MESSAGE CHIME (Warm, dual-harmonic SaaS chime)
 * Signals a thoughtful response from TechMate AI.
 * Harmonious interval: D5 (587.33 Hz) transitioning to A5 (880 Hz)
 * with a subtle crystalline overtone.
 */
export function playReceiveMessageSound(enabled = true): void {
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Master filter to keep chime warm and silky
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2600, now);

    // Tone 1: Root note (D5)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5

    const gain1 = ctx.createGain();
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.linearRampToValueAtTime(0.042, now + 0.008);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    // Tone 2: Perfect fifth higher (A5), slight delay for elegance
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.0, now + 0.04); // A5

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.setValueAtTime(0.0001, now + 0.04);
    gain2.gain.linearRampToValueAtTime(0.035, now + 0.048);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

    // Tone 3: Delicate shimmer overtone (D6) at whisper volume
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(1174.66, now + 0.07);

    const gain3 = ctx.createGain();
    gain3.gain.setValueAtTime(0.0001, now);
    gain3.gain.setValueAtTime(0.0001, now + 0.07);
    gain3.gain.linearRampToValueAtTime(0.015, now + 0.075);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

    // Routing
    osc1.connect(gain1);
    osc2.connect(gain2);
    osc3.connect(gain3);

    gain1.connect(filter);
    gain2.connect(filter);
    gain3.connect(filter);

    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.04);
    osc3.start(now + 0.07);

    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
    osc3.stop(now + 0.35);
  } catch {
    // Graceful fallback
  }
}

/**
 * 3. BACKGROUND NOTIFICATION ALERT (Double chime when widget is closed/minimized)
 * Polished, polite notification alert to let the user know an answer is ready.
 */
export function playNotificationAlertSound(enabled = true): void {
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);

    // First ping: 659.25 Hz (E5)
    const oscA = ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.setValueAtTime(659.25, now);

    const gainA = ctx.createGain();
    gainA.gain.setValueAtTime(0.0001, now);
    gainA.gain.linearRampToValueAtTime(0.045, now + 0.006);
    gainA.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    // Second ping: 880 Hz (A5), spaced 90ms later
    const oscB = ctx.createOscillator();
    oscB.type = 'sine';
    oscB.frequency.setValueAtTime(880, now + 0.09);

    const gainB = ctx.createGain();
    gainB.gain.setValueAtTime(0.0001, now);
    gainB.gain.setValueAtTime(0.0001, now + 0.09);
    gainB.gain.linearRampToValueAtTime(0.048, now + 0.096);
    gainB.gain.exponentialRampToValueAtTime(0.0001, now + 0.34);

    oscA.connect(gainA);
    oscB.connect(gainB);

    gainA.connect(filter);
    gainB.connect(filter);

    filter.connect(ctx.destination);

    oscA.start(now);
    oscB.start(now + 0.09);

    oscA.stop(now + 0.18);
    oscB.stop(now + 0.38);
  } catch {
    // Graceful fallback
  }
}

/**
 * 4. TOGGLE SOUND FEEDBACK (Micro-click preview when toggled ON)
 * Confirms to user that audio has been unmuted.
 */
export function playToggleFeedbackSound(enabled = true): void {
  if (!enabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.03);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.025, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Graceful fallback
  }
}
