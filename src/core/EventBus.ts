import Phaser from 'phaser';
import type { GameEvent } from '@/types';

/**
 * Decoupled global event bus.
 * Systems emit events; UI, save, achievements, and audio listen.
 */
class EventBus extends Phaser.Events.EventEmitter {
  emitEvent(event: GameEvent): boolean {
    return this.emit(event.type, event);
  }

  onEvent<T extends GameEvent['type']>(type: T, listener: (event: Extract<GameEvent, { type: T }>) => void): this {
    return this.on(type, listener);
  }

  offEvent<T extends GameEvent['type']>(type: T, listener: (event: Extract<GameEvent, { type: T }>) => void): this {
    return this.off(type, listener);
  }
}

export const eventBus = new EventBus();
