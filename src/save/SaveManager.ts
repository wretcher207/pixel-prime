import type { GameSettings, SaveData, GameStats } from '@/types';
import { SAVE_VERSION, ABILITIES, REGIONS } from '@/core/Constants';

const SAVE_KEY = 'pixel-prime-save-v1';
const SAVE_DEBOUNCE_MS = 1500;

const DEFAULT_SETTINGS: GameSettings = {
  masterVolume: 0.8,
  musicVolume: 0.7,
  effectsVolume: 0.9,
  fullscreen: false,
  highContrast: false,
  reducedMotion: false,
  screenShake: 1.0,
  keyBindings: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    jump: 'ArrowUp',
    dash: 'Shift',
    attack: 'Z',
    interact: 'X',
    pause: 'Escape',
  },
};

const DEFAULT_STATS: GameStats = {
  deaths: 0,
  kills: 0,
  distanceTraveled: 0,
  jumps: 0,
  dashes: 0,
  playTime: 0,
};

export function createFreshSave(): SaveData {
  return {
    version: SAVE_VERSION,
    player: {
      health: 100,
      maxHealth: 100,
      energy: 50,
      maxEnergy: 50,
      abilities: [ABILITIES.Dash],
      upgrades: [],
      position: { x: 128, y: 256 },
      region: REGIONS.GhostCache,
    },
    world: {
      unlockedRegions: [REGIONS.GhostCache],
      openedDoors: [],
      defeatedBosses: [],
      collectedItems: [],
    },
    achievements: [],
    lore: [],
    settings: { ...DEFAULT_SETTINGS },
    stats: { ...DEFAULT_STATS },
    timestamp: Date.now(),
  };
}

export class SaveManager {
  private data: SaveData;
  private dirty = false;
  private flushTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.data = this.load();
    this.attachUnloadFlush();
  }

  private load(): SaveData {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return createFreshSave();
      const parsed = JSON.parse(raw) as SaveData;
      if (parsed.version !== SAVE_VERSION) {
        // Future migration hook.
        return createFreshSave();
      }
      return { ...createFreshSave(), ...parsed };
    } catch (err) {
      console.error('Save load failed; starting fresh.', err);
      return createFreshSave();
    }
  }

  /** Flush immediately. Call before critical transitions. */
  save(): void {
    this.cancelFlush();
    this.dirty = false;
    try {
      this.data.timestamp = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    } catch (err) {
      console.error('Save write failed.', err);
    }
  }

  private scheduleFlush(): void {
    if (this.dirty) return;
    this.dirty = true;
    this.cancelFlush();
    this.flushTimer = setTimeout(() => this.save(), SAVE_DEBOUNCE_MS);
  }

  private cancelFlush(): void {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
  }

  private attachUnloadFlush(): void {
    if (typeof window === 'undefined') return;
    window.addEventListener('beforeunload', () => this.save());
  }

  getSave(): SaveData {
    return this.data;
  }

  updatePlayer(partial: Partial<SaveData['player']>): void {
    this.data.player = { ...this.data.player, ...partial };
    this.scheduleFlush();
  }

  updateWorld(partial: Partial<SaveData['world']>): void {
    this.data.world = { ...this.data.world, ...partial };
    this.scheduleFlush();
  }

  updateStats(partial: Partial<GameStats>): void {
    this.data.stats = { ...this.data.stats, ...partial };
    this.scheduleFlush();
  }

  updateSettings(partial: Partial<GameSettings>): void {
    this.data.settings = { ...this.data.settings, ...partial };
    this.scheduleFlush();
  }

  unlockAchievement(id: string): boolean {
    if (this.data.achievements.includes(id)) return false;
    this.data.achievements.push(id);
    this.scheduleFlush();
    return true;
  }

  collectLore(id: string): boolean {
    if (this.data.lore.includes(id)) return false;
    this.data.lore.push(id);
    this.scheduleFlush();
    return true;
  }

  reset(): SaveData {
    this.data = createFreshSave();
    this.save();
    return this.data;
  }
}

export const saveManager = new SaveManager();
