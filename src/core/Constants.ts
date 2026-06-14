/**
 * Immutable game constants and tuning values.
 * All numeric gameplay tunables live in Configuration.ts, not here.
 */

export const GAME_TITLE = 'PIXEL PRIME';
export const GAME_TAGLINE = 'The internet is haunted. Pixel haunts back.';

export const GAME_VERSION = '0.1.0';
export const SAVE_VERSION = 1;

export const SCENE_KEYS = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  MainMenu: 'MainMenuScene',
  Game: 'GameScene',
  UI: 'UIScene',
} as const;

export const COLORS = {
  // Brand palette lifted from the Dead Pixel Design screenshot.
  ghostWhite: 0xfdfdfd,
  ghostBlack: 0x111111,
  digitalTeal: 0x00f0c8,
  digitalPink: 0xff0055,
  corruptedPurple: 0x7d00ff,
  terminalGreen: 0x33ff33,
  screenAmber: 0xffb000,
  bgVoid: 0x0a0a12,
  bgPanel: 0x14141f,
  danger: 0xff3333,
} as const;

export const LAYERS = {
  background: -100,
  parallax: -50,
  tiles: 0,
  entities: 10,
  player: 20,
  effects: 30,
  ui: 100,
} as const;

export const REGIONS = {
  GhostCache: 'Ghost Cache',
  ApiGraveyard: 'API Graveyard',
  StartupWasteland: 'Startup Wasteland',
  InfiniteScroll: 'Infinite Scroll',
  TheWorkspace: 'The Workspace',
  CommitCatacombs: 'Commit Catacombs',
} as const;

export const ABILITIES = {
  Dash: 'dash',
  DoubleJump: 'double-jump',
  WallSlide: 'wall-slide',
  WallJump: 'wall-jump',
  GhostPhase: 'ghost-phase',
  DataGrapple: 'data-grapple',
  PacketBurst: 'packet-burst',
  MemoryShift: 'memory-shift',
  DigitalCloak: 'digital-cloak',
} as const;
