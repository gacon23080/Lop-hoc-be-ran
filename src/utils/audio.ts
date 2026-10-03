// Subtle preschool sound effects using Web Audio API

class SoundEffects {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  // Play a gentle toy bell chime (cute xylophone)
  playChime(type: 'pop' | 'bell' | 'love' | 'paper' | 'admin' | 'munch' | 'splash' | 'snore' | 'levelUp' | 'toy' | 'door' | 'slide' = 'pop') {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      if (type === 'slide') {
        // 1. Friction slide sound (cửa trượt trên thanh ray gỗ / nhôm)
        const slideOsc = this.ctx.createOscillator();
        const slideGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        slideOsc.type = 'sawtooth';
        slideOsc.frequency.setValueAtTime(130, now);
        slideOsc.frequency.linearRampToValueAtTime(175, now + 0.42);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, now);
        filter.frequency.linearRampToValueAtTime(650, now + 0.42);

        slideOsc.connect(filter);
        filter.connect(slideGain);
        slideGain.connect(this.ctx.destination);

        slideGain.gain.setValueAtTime(0.01, now);
        slideGain.gain.linearRampToValueAtTime(0.18, now + 0.1);
        slideGain.gain.linearRampToValueAtTime(0.14, now + 0.35);
        slideGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        slideOsc.start(now);
        slideOsc.stop(now + 0.5);

        // 2. The distinct Japanese door bumper clack ("XOẠCH!")
        const clackTime = now + 0.44;
        const clackOsc = this.ctx.createOscillator();
        const clackGain = this.ctx.createGain();

        clackOsc.type = 'triangle';
        clackOsc.frequency.setValueAtTime(240, clackTime);
        clackOsc.frequency.exponentialRampToValueAtTime(55, clackTime + 0.1);

        clackOsc.connect(clackGain);
        clackGain.connect(this.ctx.destination);

        clackGain.gain.setValueAtTime(0.32, clackTime);
        clackGain.gain.exponentialRampToValueAtTime(0.001, clackTime + 0.14);

        clackOsc.start(clackTime);
        clackOsc.stop(clackTime + 0.14);
      } else if (type === 'door') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.15); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.3); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.45); // C6
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.start(now);
        osc.stop(now + 0.9);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'bell') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'love') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'paper') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'admin') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.1);
        osc.frequency.setValueAtTime(1046.50, now + 0.2); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'munch') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.setValueAtTime(450, now + 0.05);
        osc.frequency.setValueAtTime(350, now + 0.1);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'splash') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'snore') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'levelUp') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      } else if (type === 'toy') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.setValueAtTime(900, now + 0.07);
        osc.frequency.setValueAtTime(1200, now + 0.14);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {
      // Ignore audio failure if not supported or disabled
    }
  }

  // Voice quote speech reading (optional cute browser speech)
  speakQuote(text: string) {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const cleanText = text.replace(/#/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.05;
        utterance.pitch = 1.25; // slightly higher cute pitch
        window.speechSynthesis.speak(utterance);
      }
    } catch {
      // Audio speech fallback
    }
  }
}

export const sound = new SoundEffects();
