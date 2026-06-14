import Phaser from 'phaser';
import { SCENE_KEYS, GAME_TITLE, GAME_TAGLINE, COLORS } from '@/core/Constants';

/**
 * Title screen.
 * Phase 9 adds animated background, music, and settings menu.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENE_KEYS.MainMenu });
  }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(COLORS.bgVoid);

    const pixel = this.add.image(width / 2, height / 2 - 80, 'pixel').setScale(4);
    pixel.setAlpha(0.9);

    const title = this.add.text(width / 2, height / 2, GAME_TITLE, {
      fontFamily: 'monospace',
      fontSize: '48px',
      color: '#fdfdfd',
    });
    title.setOrigin(0.5);

    const tagline = this.add.text(width / 2, height / 2 + 48, GAME_TAGLINE, {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#00f0c8',
    });
    tagline.setOrigin(0.5);

    const prompt = this.add.text(width / 2, height / 2 + 120, 'Press SPACE to haunt', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#8888aa',
    });
    prompt.setOrigin(0.5);

    this.tweens.add({
      targets: prompt,
      alpha: 0.3,
      duration: 900,
      yoyo: true,
      repeat: -1,
    });

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start(SCENE_KEYS.Game);
    });
  }
}
