import Phaser from 'phaser';
import type { InputManager } from '@/core/InputManager';
import { saveManager } from '@/save/SaveManager';
import { eventBus } from '@/core/EventBus';
import { LAYERS, COLORS } from '@/core/Constants';

/**
 * Pixel the Ghost — the player character.
 * Phase 1: run, jump, face direction, and emit trail particles.
 * Phase 2+: dash, double jump, wall slide/jump, ghost phase, etc.
 */
export class Player extends Phaser.Physics.Arcade.Sprite {
  private speed = 180;
  private jumpVelocity = -360;
  private controls: InputManager;
  private trail: Phaser.GameObjects.Particles.ParticleEmitter | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number, controls: InputManager) {
    super(scene, x, y, 'pixel');
    this.controls = controls;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setDepth(LAYERS.player);
    this.setCollideWorldBounds(true);
    this.setBounce(0.05);
    this.setDrag(800, 0);
    this.setMaxVelocity(300, 600);
    this.setSize(18, 26);
    this.setOffset(7, 3);

    this.createTrail();
  }

  private createTrail(): void {
    const emitter = this.scene.add.particles(this.x, this.y, 'particle', {
      lifespan: 350,
      scale: { start: 0.6, end: 0 },
      alpha: { start: 0.6, end: 0 },
      tint: COLORS.digitalTeal,
      frequency: 60,
      quantity: 1,
      blendMode: Phaser.BlendModes.ADD,
    });
    emitter.startFollow(this);
    this.trail = emitter;
  }

  update(_time: number, _delta: number): void {
    this.handleMovement();
    this.handleJump();
  }

  private handleMovement(): void {
    let vx = 0;
    if (this.controls.isDown('left')) {
      vx = -this.speed;
      this.setFlipX(true);
    } else if (this.controls.isDown('right')) {
      vx = this.speed;
      this.setFlipX(false);
    }
    this.setVelocityX(vx);

    // Track distance for stats.
    if (vx !== 0) {
      const stats = saveManager.getSave().stats;
      saveManager.updateStats({ distanceTraveled: stats.distanceTraveled + Math.abs(vx / 60) });
    }
  }

  private handleJump(): void {
    if (this.controls.justPressed('jump') && this.body?.blocked.down) {
      this.setVelocityY(this.jumpVelocity);
      const stats = saveManager.getSave().stats;
      saveManager.updateStats({ jumps: stats.jumps + 1 });
      this.emitJumpPoof();
    }
  }

  private emitJumpPoof(): void {
    const poof = this.scene.add.particles(
      this.x,
      this.y + this.height * 0.4,
      'particle',
      {
        lifespan: 300,
        speed: { min: 20, max: 80 },
        angle: { min: 80, max: 100 },
        scale: { start: 0.5, end: 0 },
        tint: COLORS.digitalTeal,
        blendMode: Phaser.BlendModes.ADD,
        emitting: false,
      }
    );
    poof.explode(6);
    this.scene.time.delayedCall(400, () => poof.destroy());
  }

  takeDamage(amount: number, source?: string): void {
    if (this.alpha < 1) return;

    const save = saveManager.getSave();
    const newHealth = Math.max(0, save.player.health - amount);
    saveManager.updatePlayer({ health: newHealth });
    eventBus.emitEvent({ type: 'PLAYER_DAMAGED', amount, source });

    // Knockback + brief invulnerability.
    const dir = this.flipX ? 1 : -1;
    this.setVelocity(dir * 180, -220);
    this.setAlpha(0.5);
    this.scene.tweens.add({
      targets: this,
      alpha: 1,
      duration: 1200,
      onComplete: () => this.setAlpha(1),
    });

    if (newHealth <= 0) {
      this.die();
    }
  }

  private die(): void {
    const stats = saveManager.getSave().stats;
    saveManager.updateStats({ deaths: stats.deaths + 1 });
    this.scene.cameras.main.shake(200, 0.01);
    this.setPosition(128, 256);
    saveManager.updatePlayer({ health: saveManager.getSave().player.maxHealth });
  }

  destroy(_fromScene?: boolean): void {
    this.trail?.destroy();
    this.trail = null;
    super.destroy(_fromScene);
  }
}
