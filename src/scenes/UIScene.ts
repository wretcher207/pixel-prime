import Phaser from 'phaser';
import { SCENE_KEYS, COLORS, LAYERS } from '@/core/Constants';
import { saveManager } from '@/save/SaveManager';

/**
 * Persistent HUD overlay.
 * Phase 1 shows health/energy; later phases add abilities, lore, and achievements.
 */
export class UIScene extends Phaser.Scene {
  private healthBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super({ key: SCENE_KEYS.UI });
  }

  create(): void {
    this.add.text(16, 16, 'PIXEL PRIME v0.1.0', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#666688',
    });

    this.healthBar = this.add.graphics();
    this.healthBar.setDepth(LAYERS.ui);
    this.drawHealth();
  }

  update(): void {
    this.drawHealth();
  }

  private drawHealth(): void {
    const player = saveManager.getSave().player;
    const pct = player.health / player.maxHealth;

    this.healthBar.clear();
    this.healthBar.fillStyle(0x333344, 1);
    this.healthBar.fillRect(42, 36, 104, 10);
    this.healthBar.fillStyle(COLORS.digitalPink, 1);
    this.healthBar.fillRect(44, 38, 100 * pct, 6);
  }
}
