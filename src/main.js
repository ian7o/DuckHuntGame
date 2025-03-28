import { Crosshair } from './input/crosshair.js';
import { game } from './game/game.js';

document.addEventListener('DOMContentLoaded', () => {
    const crosshair = Crosshair();
    crosshair.initMouseTracking();
    const Game = game()
    document.addEventListener('click', () => Game.processShot())
    Game.wave()
});

//doesnt exist you will adapt this 
const startButton = document.querySelector('.playbtn');
const restartButton = document.querySelector('.restartbtn');


startButton.addEventListener('click', () => {
    console.log("start game clicked");
    startGame();
});

restartButton.addEventListener('click', () => {
    console.log("restart game clicked");
    restartGame();
})