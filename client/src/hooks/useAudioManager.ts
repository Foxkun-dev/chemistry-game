import { useEffect, useRef, useState } from 'react';

/**
 * Audio Manager Hook
 * Quản lý âm thanh, nhạc nền và hiệu ứng âm thanh
 */

type SoundType = 'reaction' | 'success' | 'error' | 'click' | 'combo' | 'unlock';

export function useAudioManager(enabled: boolean = true) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Audio Context
  useEffect(() => {
    if (!enabled || isInitialized) return;

    const initAudio = () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          audioContextRef.current = new AudioContext();
          setIsInitialized(true);
        }
      } catch (e) {
        console.warn('Audio Context not supported:', e);
      }
    };

    // Initialize on user interaction
    const handleUserInteraction = () => {
      initAudio();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [enabled, isInitialized]);

  const playSound = (type: SoundType) => {
    if (!enabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    try {
      switch (type) {
        case 'reaction': {
          // Reaction sound: ascending tones
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.frequency.setValueAtTime(400, now);
          osc1.frequency.exponentialRampToValueAtTime(600, now + 0.1);
          osc2.frequency.setValueAtTime(300, now);
          osc2.frequency.exponentialRampToValueAtTime(400, now + 0.1);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.2);
          osc2.stop(now + 0.2);
          break;
        }

        case 'success': {
          // Success sound: high ascending tones
          const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
          frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.2, now + idx * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.15);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.15);
          });
          break;
        }

        case 'error': {
          // Error sound: descending tones
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.frequency.setValueAtTime(400, now);
          osc1.frequency.exponentialRampToValueAtTime(200, now + 0.2);
          osc2.frequency.setValueAtTime(300, now);
          osc2.frequency.exponentialRampToValueAtTime(150, now + 0.2);

          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + 0.25);
          osc2.stop(now + 0.25);
          break;
        }

        case 'click': {
          // Click sound: short beep
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.frequency.value = 800;
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.05);
          break;
        }

        case 'combo': {
          // Combo sound: ascending bright tones
          const frequencies = [659.25, 783.99, 987.77]; // E5, G5, B5
          frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.25, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.12);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.12);
          });
          break;
        }

        case 'unlock': {
          // Unlock sound: magical ascending sweep
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);

          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + 0.35);
          break;
        }
      }
    } catch (e) {
      console.warn('Error playing sound:', e);
    }
  };

  const playBackgroundMusic = () => {
    if (!enabled || !audioContextRef.current) return;

    // Placeholder for background music
    // In production, would load actual audio file
    console.log('Background music playing...');
  };

  return {
    playSound,
    playBackgroundMusic,
    isInitialized,
  };
}
