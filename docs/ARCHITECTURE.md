# PIXEL PRIME Architecture

## Goals

- Production-quality, maintainable codebase.
- Modular, event-driven, ECS-inspired organization.
- Easy to iterate on gameplay without touching engine plumbing.
- 60 FPS browser performance.

## Directory Layout

```
src/
  core/          Engine-agnostic systems: constants, event bus, state machine, input, game config
  scenes/        Phaser scenes: Boot, Preload, MainMenu, Game, UI
  entities/      Player, enemies, bosses, NPCs
  components/    Reusable entity behaviors (health, movement, AI, etc.)
  systems/       Game loops that operate on component sets
  world/         Regions, levels, tilemaps, environmental storytelling
  ui/            Menus, HUD, dialogs, notifications
  audio/         Audio manager and bus routing
  save/          LocalStorage persistence, save versioning, migration
  achievements/  Achievement definitions and unlock engine
  lore/          Collectible lore entries
  utils/         Helpers, texture generation, math
  types/         Global TypeScript types
  assets/        Runtime assets (images, audio, shaders, tilemaps)
public/          Static files served as-is
```

## Architectural Patterns

### Event Bus

`src/core/EventBus.ts` wraps `Phaser.Events.EventEmitter` with typed `GameEvent` payloads.
Systems emit events; UI, audio, save, and achievements listen without direct coupling.

### State Machine

`src/core/StateMachine.ts` is a lightweight generic FSM used for:
- Player movement states (idle, run, jump, dash, wall-slide, etc.).
- Enemy AI behavior trees.
- Boss phases.

### Save System

`src/save/SaveManager.ts` owns the single source of truth for persistent data.
It serializes to `localStorage` under `pixel-prime-save-v1` and supports future migrations via `SAVE_VERSION`.

### Input Manager

`src/core/InputManager.ts` maps physical keys to actions (`left`, `jump`, `dash`, etc.).
Key rebinding in Phase 5 updates the action map and persists settings.

### Procedural Placeholders

`src/utils/TextureGenerator.ts` draws runtime textures so the game is playable before final art.
Phase 9 will replace these with authored sprites/audio without changing the consuming code.

### Scene Flow

1. **BootScene** — generate placeholder textures, then transition to Preload.
2. **PreloadScene** — load authored assets and show a loading bar.
3. **MainMenuScene** — title screen, settings, continue/new game.
4. **GameScene** — gameplay world, camera, entities.
5. **UIScene** — persistent HUD launched in parallel with GameScene.

### Rendering Strategy

- `pixelArt: true` with `Phaser.Scale.FIT` for crisp sprites.
- Layers and depth constants in `LAYERS`.
- Camera follows the player with subtle lerp.
- Particle effects use additive blending for a digital glow.

### Performance Rules

- Pool particles and enemies where possible.
- Use object pooling for frequent projectiles.
- Avoid per-frame allocations in `update()` loops.
- Collisions are Arcade Physics; keep shapes simple.

## Phases

See `CHANGELOG.md` for phase-by-phase progress.
Each phase ends with a self-review and a Git commit.
