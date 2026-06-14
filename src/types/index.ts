/**
 * Global type definitions for PIXEL PRIME.
 * Keep domain-specific types co-located with their systems.
 */

export interface Vector2Like {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameSettings {
  masterVolume: number;
  musicVolume: number;
  effectsVolume: number;
  fullscreen: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  screenShake: number;
  keyBindings: KeyBindings;
}

export interface KeyBindings {
  left: string;
  right: string;
  jump: string;
  dash: string;
  attack: string;
  interact: string;
  pause: string;
}

export interface SaveData {
  version: number;
  player: PlayerSaveData;
  world: WorldSaveData;
  achievements: string[];
  lore: string[];
  settings: GameSettings;
  stats: GameStats;
  timestamp: number;
}

export interface PlayerSaveData {
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  abilities: string[];
  upgrades: string[];
  position: Vector2Like;
  region: string;
}

export interface WorldSaveData {
  unlockedRegions: string[];
  openedDoors: string[];
  defeatedBosses: string[];
  collectedItems: string[];
}

export interface GameStats {
  deaths: number;
  kills: number;
  distanceTraveled: number;
  jumps: number;
  dashes: number;
  playTime: number;
}

export type GameEvent =
  | { type: 'PLAYER_DAMAGED'; amount: number; source?: string }
  | { type: 'PLAYER_HEALED'; amount: number }
  | { type: 'ABILITY_UNLOCKED'; ability: string }
  | { type: 'ACHIEVEMENT_UNLOCKED'; id: string }
  | { type: 'LORE_COLLECTED'; id: string }
  | { type: 'BOSS_DEFEATED'; id: string }
  | { type: 'SCENE_CHANGED'; scene: string }
  | { type: 'SETTINGS_CHANGED'; settings: Partial<GameSettings> };

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  secret: boolean;
  icon: string;
}

export type AchievementCategory =
  | 'exploration'
  | 'combat'
  | 'secrets'
  | 'humor'
  | 'developer'
  | 'completion';

export interface LoreEntryDef {
  id: string;
  title: string;
  region: string;
  body: string;
}
