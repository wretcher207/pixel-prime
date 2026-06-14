import type { GameSettings, SaveData, GameStats } from '@/types';
import { SAVE_VERSION, ABILITIES, REGIONS } from '@/core/Constants';

const SAVE_KEY = 'pixel-prime-save-v1';

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

  constructor() {
    this.data = this.load();
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

  save(): void {
    try {
      this.data.timestamp = Date.now();
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    } catch (err) {
      console.error('Save write failed.', err);
    }
  }

  getSave(): SaveData {
    return this.data;
  }

  updatePlayer(partial: Partial<SaveData['player']>): void {
    this.data.player = { ...this.data.player, ...partial };
    this.save();
  }

  updateWorld(partial: Partial<SaveData['world']>): void {
    this.data.world = { ...this.data.world, ...partial };
    this.save();
  }

  updateStats(partial: Partial<GameStats>): void {
    this.data.stats = { ...this.data.stats, ...partial };
    this.save();
  }

  updateSettings(partial: Partial<GameSettings>): void {
    this.data.settings = { ...this.data.settings, ...partial };
    this.save();
  }

  unlockAchievement(id: string): boolean {
    if (this.data.achievements.includes(id)) return false;
    this.data.achievements.push(id);
    this.save();
    return true;
  }

  collectLore(id: string): boolean {
    if (this.data.lore.includes(id)) return false;
    this.data.lore.push(id);
    this.save();
    return true;
  }

  reset(): SaveData {
    this.data = createFreshSave();
    this.save();
    return this.data;
  }
}

export const saveManager = new SaveManager();
