import { Crosshair } from './input/crosshair.js';
import { Game } from './game/game.js';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.playButton');
    const restartButton = document.querySelector('.restartButton');

    const crosshair = Crosshair();
    crosshair.initMouseTracking();
    const game = Game();

    document.addEventListener('click', () => game.processShot());
    startButton.addEventListener('click', () =>  game.startGame());
    restartButton.addEventListener('click', () => game.restartGame())
});

