import Phaser from 'phaser';
import type { GameSettings } from '@/types';

/**
 * Action-based input wrapper.
 * Phase 2 adds gamepad support; Phase 5 wires key rebinding.
 */
export class InputManager {
  private keys: Map<string, Phaser.Input.Keyboard.Key> = new Map();

  constructor(
    private keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
    private settings: GameSettings
  ) {}

  bind(): void {
    const kb = this.keyboard;
    const bindings = this.settings.keyBindings;
    this.keys.set('left', kb.addKey(bindings.left));
    this.keys.set('right', kb.addKey(bindings.right));
    this.keys.set('jump', kb.addKey(bindings.jump));
    this.keys.set('dash', kb.addKey(bindings.dash));
    this.keys.set('attack', kb.addKey(bindings.attack));
    this.keys.set('interact', kb.addKey(bindings.interact));
    this.keys.set('pause', kb.addKey(bindings.pause));
  }

  isDown(action: string): boolean {
    return this.keys.get(action)?.isDown ?? false;
  }

  justPressed(action: string): boolean {
    const key = this.keys.get(action);
    return key ? Phaser.Input.Keyboard.JustDown(key) : false;
  }

  rebind(action: string, keyCode: string): void {
    const kb = this.keyboard;
    const old = this.keys.get(action);
    if (old) {
      old.destroy();
    }
    this.keys.set(action, kb.addKey(keyCode));
    // Settings persistence handled by caller.
  }
}
