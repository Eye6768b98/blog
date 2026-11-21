// Cozy Web Audio synthesizer for playing real Witchy Tunes music-box & pad melodies
class WitchyAudioEngine {
  private ctx: AudioContext | null = null;
  private stepTimer: number | null = null;
  private stepIndex = 0;
  private isPlaying = false;
  private currentNotes: number[] = [];
  private currentBpm = 84;
  private volume = 0.25;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(nextVol: number) {
    this.volume = Math.max(0, Math.min(1, nextVol));
  }

  public playSequence(notes: number[], bpm: number) {
    this.stop();
    const ctx = this.ensureContext();
    this.currentNotes = notes;
    this.currentBpm = bpm;
    this.stepIndex = 0;
    this.isPlaying = true;

    const stepMs = Math.round((60 / Math.max(40, bpm) / 2) * 1000);

    const triggerNote = () => {
      if (!this.isPlaying || !this.ctx || this.currentNotes.length === 0) return;
      const freq = this.currentNotes[this.stepIndex % this.currentNotes.length];
      this.playBellTone(ctx, freq);
      if (this.stepIndex % 4 === 0) {
        this.playWarmPad(ctx, freq * 0.5);
      }
      this.stepIndex += 1;
    };

    triggerNote();
    this.stepTimer = window.setInterval(triggerNote, stepMs);
  }

  public playChordPreview(frequencies: number[]) {
    const ctx = this.ensureContext();
    frequencies.forEach((freq, idx) => {
      window.setTimeout(() => {
        this.playBellTone(ctx, freq);
      }, idx * 110);
    });
  }

  private playBellTone(ctx: AudioContext, freq: number) {
    if (freq <= 0) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const harmonic = ctx.createOscillator();
    const gain = ctx.createGain();
    const harmonicGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const peak = 0.14 * this.volume;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.001, peak), now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);

    harmonicGain.gain.setValueAtTime(0.0001, now);
    harmonicGain.gain.exponentialRampToValueAtTime(Math.max(0.0005, peak * 0.25), now + 0.015);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(gain);
    harmonic.connect(harmonicGain);
    harmonicGain.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + 1.2);
    harmonic.stop(now + 0.5);
  }

  private playWarmPad(ctx: AudioContext, freq: number) {
    if (freq <= 0) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, now);

    const peak = 0.08 * this.volume;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.001, peak), now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.25);
  }

  public stop() {
    this.isPlaying = false;
    if (this.stepTimer !== null) {
      window.clearInterval(this.stepTimer);
      this.stepTimer = null;
    }
  }
}

export const witchyAudio = new WitchyAudioEngine();
