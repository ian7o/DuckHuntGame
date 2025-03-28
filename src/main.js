import { Crosshair } from './input/crosshair.js';
import { Duck } from './game/duck.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const crosshair = Crosshair();
    crosshair.initMouseTracking();
    const gameArea = document.querySelector('.gameArea');

    const duck = Duck();
    const spawnData = duck.spawn(gameArea);
    duck.move(spawnData.duckElement,spawnData.movement,spawnData.initialPosition)

    // Add this debug line
    console.log('Game area HTML after duck:', gameArea.innerHTML);
});
