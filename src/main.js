import { Crosshair } from './input/crosshair.js';

document.addEventListener('DOMContentLoaded', () => {
  const crosshair = Crosshair();
  crosshair.initMouseTracking();
});
import { Duck } from './game/duck.js';

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.gameArea');

    const duck = Duck();
    const duckElement = duck.create(gameArea);

    const movement = ['diagonalBottomLeftTopRight', 'diagonalBottomRightTopLeft'];
    let randomMovement = movement[Math.floor(Math.random() * movement.length)];

    duck.move(duckElement, randomMovement);
});
