import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '@/core/Constants';
import {
  createPixelGhostCanvas,
  createGroundTileCanvas,
  createParticleCanvas,
  createEnemyCanvas,
} from '@/utils/TextureGenerator';

/**
 * BootScene runs once and creates all runtime placeholder textures.
 * It keeps PreloadScene focused on loading authored assets later.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.Boot });
  }

  create(): void {
    this.generateTextures();
    this.scene.start(SCENE_KEYS.Preload);
  }

  private generateTextures(): void {
    this.textures.addCanvas('pixel', createPixelGhostCanvas());
    this.textures.addCanvas('ground', createGroundTileCanvas());
    this.textures.addCanvas('particle', createParticleCanvas());
    this.textures.addCanvas('enemy', createEnemyCanvas());

    // Simple 1x1 colored pixel for drawing primitives / UI / effects.
    const pixel = this.add.graphics();
    pixel.fillStyle(COLORS.digitalTeal, 1);
    pixel.fillRect(0, 0, 1, 1);
    pixel.generateTexture('fx-pixel', 1, 1);
    pixel.destroy();
  }
}
