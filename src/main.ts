import { createGame } from '@/core/Game';
import '@/style.css';

/**
 * PIXEL PRIME entry point.
 * Bootstraps the Phaser game into the #app container.
 */
const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('No #app container found in index.html');
}

createGame('app');
