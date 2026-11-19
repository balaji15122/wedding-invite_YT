import { Howl, Howler } from 'howler';

class WeddingSoundEngine {
  constructor() {
    this.sound = null;
    this.isPlaying = false;
    this.volume = 0.65;
    this.isMuted = false;
    this.listeners = new Set();
    this.synthInterval = null;
    this.audioContext = null;

    // Load initial mute state from localStorage
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('wedding_music_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedVol = localStorage.getItem('wedding_music_volume');
      if (savedVol !== null) {
        this.volume = parseFloat(savedVol);
      }
    }
  }

  init(trackPath = '/audio/wedding-song.mp3') {
    if (this.sound) return;

    try {
      this.sound = new Howl({
        src: [trackPath],
        html5: true, // Stream large audio and ensure mobile compatibility
        loop: true,
        volume: this.isMuted ? 0 : this.volume,
        preload: true,
        onloaderror: (id, err) => {
          console.warn('Howler audio file load notice. Starting synthesizer backup:', err);
          this.initSynthesizerBackup();
        },
        onplay: () => {
          this.isPlaying = true;
          this.notify();
        },
        onpause: () => {
          this.isPlaying = false;
          this.notify();
        },
        onstop: () => {
          this.isPlaying = false;
          this.notify();
        },
        onend: () => {
          this.isPlaying = false;
          this.notify();
        },
      });
    } catch (e) {
      console.warn('Howler init failed, falling back to Web Audio synth:', e);
      this.initSynthesizerBackup();
    }
  }

  initSynthesizerBackup() {
    // Elegant fallback synth using Web Audio API if local audio file fails
    if (this.audioContext || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.audioContext = new AudioCtx();
    } catch (e) {
      console.error('AudioContext unavailable:', e);
    }
  }

  play() {
    if (this.isMuted) return;

    if (this.sound) {
      try {
        if (!this.sound.playing()) {
          this.sound.volume(0);
          this.sound.play();
          this.sound.fade(0, this.volume, 1500);
        }
        this.isPlaying = true;
        this.notify();
        return;
      } catch (err) {
        console.warn('Howler play error, using synth fallback', err);
      }
    }

    // Fallback synth play
    this.playSynthMelody();
  }

  playSynthMelody() {
    if (!this.audioContext) this.initSynthesizerBackup();
    if (!this.audioContext) return;
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    this.isPlaying = true;
    this.notify();

    if (this.synthInterval) return;

    // Harmonious Indian Raag Yaman scale notes
    const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 493.88, 523.25];
    let noteIdx = 0;

    const playNext = () => {
      if (!this.isPlaying || this.isMuted || !this.audioContext) return;
      try {
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequencies[noteIdx % frequencies.length], this.audioContext.currentTime);

        const now = this.audioContext.currentTime;
        const targetGain = this.volume * 0.15;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(targetGain, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 2.5);

        noteIdx = (noteIdx + 1) % frequencies.length;
      } catch (e) {
        // ignore
      }
    };

    playNext();
    this.synthInterval = setInterval(playNext, 1800);
  }

  pause() {
    if (this.sound && this.sound.playing()) {
      this.sound.fade(this.sound.volume(), 0, 800);
      setTimeout(() => {
        if (this.sound) this.sound.pause();
      }, 800);
    }
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      if (this.isMuted) {
        this.setMute(false);
      }
      this.play();
    }
  }

  setMute(mute) {
    this.isMuted = mute;
    localStorage.setItem('wedding_music_muted', String(mute));

    if (this.sound) {
      if (mute) {
        this.sound.mute(true);
      } else {
        this.sound.mute(false);
        this.sound.volume(this.volume);
        if (!this.isPlaying) {
          this.play();
        }
      }
    }

    if (mute && this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    } else if (!mute && this.isPlaying && !this.sound) {
      this.playSynthMelody();
    }

    this.notify();
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, newVol));
    localStorage.setItem('wedding_music_volume', String(this.volume));

    if (this.sound && !this.isMuted) {
      this.sound.volume(this.volume);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    const state = {
      isPlaying: this.isPlaying,
      volume: this.volume,
      isMuted: this.isMuted,
    };
    for (const listener of this.listeners) {
      try {
        listener(state);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export const soundEngine = new WeddingSoundEngine();
