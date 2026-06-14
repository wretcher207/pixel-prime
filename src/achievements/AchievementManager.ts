import { eventBus } from '@/core/EventBus';
import { saveManager } from '@/save/SaveManager';
import type { AchievementDef } from '@/types';

/**
 * Achievement engine skeleton.
 * Phase 7 will add definitions, trackers, and UI notifications.
 */
export class AchievementManager {
  private definitions = new Map<string, AchievementDef>();

  constructor() {
    eventBus.onEvent('PLAYER_DAMAGED', (e) => this.handlePlayerDamaged(e.amount));
    eventBus.onEvent('BOSS_DEFEATED', (e) => this.unlock(e.id));
  }

  register(def: AchievementDef): void {
    this.definitions.set(def.id, def);
  }

  unlock(id: string): boolean {
    if (!this.definitions.has(id)) {
      console.warn(`Achievement ${id} not registered.`);
      return false;
    }
    if (!saveManager.unlockAchievement(id)) return false;
    eventBus.emitEvent({ type: 'ACHIEVEMENT_UNLOCKED', id });
    return true;
  }

  private handlePlayerDamaged(_amount: number): void {
    // Phase 7: "Git Gud" (die 50 times) tracked via stats.
  }
}

export const achievementManager = new AchievementManager();
