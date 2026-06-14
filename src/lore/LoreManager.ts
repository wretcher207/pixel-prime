import { eventBus } from '@/core/EventBus';
import { saveManager } from '@/save/SaveManager';
import type { LoreEntryDef } from '@/types';

/**
 * Lore collection manager.
 * Phase 8 populates entries with David/workspace/internet archaeology flavor.
 */
export class LoreManager {
  private entries = new Map<string, LoreEntryDef>();

  register(entry: LoreEntryDef): void {
    this.entries.set(entry.id, entry);
  }

  collect(id: string): boolean {
    const entry = this.entries.get(id);
    if (!entry) {
      console.warn(`Lore entry ${id} not registered.`);
      return false;
    }
    if (!saveManager.collectLore(id)) return false;
    eventBus.emitEvent({ type: 'LORE_COLLECTED', id });
    return true;
  }

  getUnlocked(): LoreEntryDef[] {
    return saveManager.getSave().lore
      .map((id) => this.entries.get(id))
      .filter((e): e is LoreEntryDef => e !== undefined);
  }
}

export const loreManager = new LoreManager();
