import type { GameSettings } from '@/types';

/**
 * AudioManager placeholder / facade.
 * Phase 1 wires volume buses and settings hooks.
 * Phase 9 swaps placeholders for real asset-driven playback.
 */
export class AudioManager {
  private settings: GameSettings;
  private muted = false;

  constructor(initial: GameSettings) {
    this.settings = initial;
  }

  applySettings(settings: Partial<GameSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  playSfx(_key: string, _opts?: { volume?: number; pitch?: number }): void {
    // Phase 9: load and play Web Audio / Phaser sound here.
  }

  playMusic(_key: string, _opts?: { loop?: boolean; fadeMs?: number }): void {
    // Phase 9: music bus.
  }

  stopMusic(_fadeMs = 500): void {
    // Phase 9.
  }

  setMasterMuted(muted: boolean): void {
    this.muted = muted;
  }

  get effectiveMaster(): number {
    return this.muted ? 0 : this.settings.masterVolume;
  }
}

export const audioManager = new AudioManager({} as GameSettings);
