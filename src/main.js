import { Crosshair } from './input/crosshair.js';
import { game } from './game/game.js';

document.addEventListener('DOMContentLoaded', () => {
    const crosshair = Crosshair();
    crosshair.initMouseTracking();
    const Game = game()
    document.addEventListener('click', () => Game.processShot())
    Game.wave()
});
