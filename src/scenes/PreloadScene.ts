import Phaser from 'phaser';
import { SCENE_KEYS } from '@/core/Constants';

/**
 * PreloadScene displays a loading bar and loads authored assets.
 * Phase 1 has no external assets; Phase 9 fills this in.
 */
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.Preload });
  }

  preload(): void {
    const { width, height } = this.scale;
    const bar = this.add.graphics();
    const box = this.add.graphics();
    box.fillStyle(0x1e1e2f, 1);
    box.fillRect(width / 2 - 160, height / 2 - 12, 320, 24);

    this.load.on('progress', (value: number) => {
      bar.clear();
      bar.fillStyle(0x00f0c8, 1);
      bar.fillRect(width / 2 - 156, height / 2 - 8, 312 * value, 16);
    });

    this.load.on('complete', () => {
      bar.destroy();
      box.destroy();
    });
  }

  create(): void {
    this.scene.start(SCENE_KEYS.MainMenu);
  }
}
