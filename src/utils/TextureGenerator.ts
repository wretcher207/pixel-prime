/**
 * Procedural texture generation for Phase 1 placeholders.
 * All assets are drawn at runtime so the vertical slice is playable
 * before final art passes. Phase 9 can swap these for authored sprites.
 */

export function createPixelGhostCanvas(width = 32, height = 32): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Body: white rounded ghost blob with pixel drips.
  ctx.fillStyle = '#fdfdfd';
  ctx.fillRect(4, 2, 24, 18);
  ctx.fillRect(2, 6, 28, 14);
  // Drips
  ctx.fillRect(6, 20, 2, 6);
  ctx.fillRect(12, 20, 2, 8);
  ctx.fillRect(18, 20, 2, 5);
  ctx.fillRect(24, 20, 2, 7);
  // Eyes
  ctx.fillStyle = '#111111';
  ctx.fillRect(10, 10, 3, 4);
  ctx.fillRect(19, 10, 3, 4);
  // Subtle glow ring drawn at scale time via shader/tint; keep sprite flat.

  return canvas;
}

export function createGroundTileCanvas(size = 32): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#14141f';
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = '#2a2a3d';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, size, size);
  ctx.fillStyle = '#1e1e2f';
  ctx.fillRect(2, 2, size - 4, size - 4);

  return canvas;
}

export function createParticleCanvas(size = 8): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(0, 240, 200, 1)');
  grad.addColorStop(1, 'rgba(0, 240, 200, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

export function createEnemyCanvas(width = 28, height = 28): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#ff0055';
  ctx.fillRect(4, 4, 20, 20);
  ctx.fillStyle = '#111111';
  ctx.fillRect(8, 10, 3, 3);
  ctx.fillRect(17, 10, 3, 3);

  return canvas;
}
