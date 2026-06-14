# PIXEL PRIME Changelog

All notable changes are documented by phase.

## Phase 1 — Project Setup (v0.1.0)

### Added
- Initialized Git repository and created `pixel-prime` GitHub repo.
- Set up Vite 8 + TypeScript 6.0 + Phaser 3.90 project.
- Configured path aliases (`@/*`), ESLint, Prettier, and Vite plugin checker.
- Defined folder structure for ECS-inspired architecture.
- Implemented core systems:
  - `EventBus` — typed global event emitter.
  - `StateMachine` — generic finite state machine.
  - `InputManager` — action-keyboard mapping with rebind hook.
  - `SaveManager` — localStorage persistence with versioning.
  - `AudioManager` placeholder.
  - `AchievementManager` skeleton.
  - `LoreManager` skeleton.
- Added scenes: Boot, Preload, MainMenu, Game, UI.
- Added procedural placeholder textures for Pixel, ground, particles, and enemies.
- Added `Player` entity with basic movement, jump, trail particles, damage, and respawn.
- Added test enemy and health HUD to validate physics, feedback, and rendering.
- Wrote `README.md`, `docs/ARCHITECTURE.md`, and this changelog.

### Commits
- `feat: initialize project structure and core systems`
- `docs: add README, architecture, and changelog`
- `ui: add title screen and HUD placeholder`
