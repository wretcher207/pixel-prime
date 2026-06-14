import Phaser from 'phaser';
import { SCENE_KEYS, COLORS, LAYERS } from '@/core/Constants';
import { InputManager } from '@/core/InputManager';
import { Player } from '@/entities/Player';
import { saveManager } from '@/save/SaveManager';

/**
 * Main gameplay scene.
 * Phase 1: a single test chamber that validates rendering, physics,
 * input, camera follow, and the build pipeline.
 */
export class GameScene extends Phaser.Scene {
  private player!: Player;
  private inputManager!: InputManager;
  private platforms!: Phaser.Physics.Arcade.StaticGroup;

  constructor() {
    super({ key: SCENE_KEYS.Game });
  }

  create(): void {
    const { width, height } = this.scale;
    this.cameras.main.setBackgroundColor(COLORS.bgVoid);
    this.cameras.main.setBounds(0, 0, width * 2, height);
    this.physics.world.setBounds(0, 0, width * 2, height);

    this.createBackground();
    this.createPlatforms();
    this.createPlayer();
    this.createHazards();

    this.scene.launch(SCENE_KEYS.UI);
  }

  update(time: number, delta: number): void {
    this.player.update(time, delta);
  }

  private createBackground(): void {
    const { width, height } = this.scale;
    const bg = this.add.graphics();
    bg.fillGradientStyle(COLORS.bgVoid, COLORS.bgVoid, COLORS.bgPanel, COLORS.bgPanel, 1);
    bg.fillRect(0, 0, width * 2, height);
    bg.setDepth(LAYERS.background);

    // Distant parallax grid lines.
    const grid = this.add.graphics();
    grid.lineStyle(1, 0x1f1f2e, 0.5);
    for (let x = 0; x < width * 2; x += 64) {
      grid.moveTo(x, 0);
      grid.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 64) {
      grid.moveTo(0, y);
      grid.lineTo(width * 2, y);
    }
    grid.strokePath();
    grid.setDepth(LAYERS.parallax);
    grid.setScrollFactor(0.25, 0.25);
  }

  private createPlatforms(): void {
    const { width, height } = this.scale;
    this.platforms = this.physics.add.staticGroup();

    // Floor.
    for (let x = 0; x < width * 2; x += 32) {
      this.platforms.create(x + 16, height - 16, 'ground');
    }

    // Steps and ledges.
    this.platforms.create(width * 0.3, height - 120, 'ground');
    this.platforms.create(width * 0.3 + 32, height - 120, 'ground');
    this.platforms.create(width * 0.6, height - 200, 'ground');
    this.platforms.create(width * 0.6 + 32, height - 200, 'ground');
    this.platforms.create(width * 0.6 + 64, height - 200, 'ground');
  }

  private createPlayer(): void {
    const spawn = saveManager.getSave().player.position;
    this.inputManager = new InputManager(this.input.keyboard!, saveManager.getSave().settings);
    this.inputManager.bind();

    this.player = new Player(this, spawn.x, spawn.y, this.inputManager);
    this.physics.add.collider(this.player, this.platforms);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
  }

  private createHazards(): void {
    // One test enemy to validate feedback hooks.
    const enemy = this.physics.add.sprite(this.scale.width * 0.75, this.scale.height - 64, 'enemy');
    enemy.setCollideWorldBounds(true);
    enemy.setBounce(1);
    enemy.setVelocityX(-60);
    this.physics.add.collider(enemy, this.platforms);
    this.physics.add.overlap(this.player, enemy, () => {
      this.player.takeDamage(20, 'test-crawler');
    });
  }
}
