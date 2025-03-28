import { Duck } from './duck.js';
import { InputHandler } from '../input/input.js';
export const game = () => {
    //need to make a wave happen
    let score = 0;
    let currentWave = 0;
    let currentRound = 0;
    let shotsRemaining = 3;
    let ducksShotThisRound = 0;
    let ducksRequiredToAdvance = 6;
    let missedShots = 0;
    let maxMissedShots = 2;
    let escapedDucks = 0;
    let activeDucks = [];
    let waveInProgress = false;

    const gameArea = document.querySelector('.gameArea');
    const inputHandler = InputHandler();

    const checkWaveEnd = () => {
        if (waveInProgress) return;

        const allDucksCheck = activeDucks.every(
            duck => duck.killed || duck.escaped || !document.body.contains(duck.element)
        );

        const outOfShots = shotsRemaining === 0;

        if (allDucksCheck || outOfShots) {
            waveInProgress = true;

            //need to count how many escaped
            const escapedDucksInWave = activeDucks.filter(
                duck => (!duck.killed && !document.body.contains(duck.element)) || duck.escaped
            ).length;

            const ducksShotInWave = activeDucks.filter(duck => duck.killed).length;
            ducksShotThisRound += ducksShotInWave;

            const waveLost = escapedDucksInWave > 0;

            escapedDucks += escapedDucksInWave;

            if (currentWave >= 5) {
                if (ducksShotThisRound >= ducksRequiredToAdvance) {
                    startNewRound();
                } else {
                    gameOver();
                }
            } else {
                startNextWave();
            }
        }
    };

    const startNewRound = () => {
        currentWave = 0;
        currentRound++;
        ducksShotThisRound = 0;
        ducksRequiredToAdvance++;
        wave();
    };

    const startNextWave = () => {
        //TODO
        updateRoundDisplay();
        resetShootsDisplay();

        setTimeout(() => {
            wave();
        }, 100);
    };

    const wave = () => {
        currentWave++;
        shotsRemaining = 3;
        activeDucks = [];
        missedShots = 0;
        waveInProgress = false;

        setTimeout(() => {
            spawnDucksForWave();
        }, 3000);
    };

    const spawnDucksForWave = () => {
        const numDucks = 2;

        for (let i = 0; i < numDucks; i++) {
            const duck = Duck();
            const spawnData = duck.spawn(gameArea);

            const duckInfo = {
                duck,
                element: spawnData.duckElement,
                killed: false,
                escaped: false,
            };

            activeDucks.push(duckInfo);

            duck.move(spawnData.duckElement, spawnData.movement, spawnData.initialPosition);
        }
    };

    function updateScore() {
        //todo scores needs to update bases on type of bird after implemeting different types
        score += 100;
    }

    const gameOver = () => {
        //TODO
        //Display game over UI
        //Allow for restarting the game
        //Show final score
    };

    const updateRoundDisplay = () => {
        //TODO
        //just get the round counter and increase it
    };

    const updateDucksKilledDisplay = () => {
        //TODO
        //this will be called in processshot when a duck is kill to
        //replace duck white with duck red so white display none and red display block
    };

    const resetShootsDisplay = () => {
        const divsThatHideBullets = document.querySelectorAll('.hideBullet');
        divsThatHideBullets.forEach(div => {
            div.style.display = 'none';
        });
    };

    const hideBullets = shotNumber => {
        const divsThatHideBullets = document.querySelectorAll('.hideBullet');

        // shotNumber is 1, 2, or 3
        // Array index is 0, 1, or 2
        const indexToHide = shotNumber - 1;

        if (indexToHide >= 0 && indexToHide < divsThatHideBullets.length) {
            divsThatHideBullets[indexToHide].style.display = 'block';
        }
    };

    const processShot = () => {
        if (shotsRemaining === 0) return;

        //if shotremining are 3 so is first shot then 3 - 3 = 0 and plus 1 means first shot etc etc
        const shotNumber = 3 - shotsRemaining + 1;
        shotsRemaining--;

        let hittedADuck = false;

        let clickX = inputHandler.getMouseXPosition();
        let clickY = inputHandler.getMouseYPosition();

        activeDucks.forEach(duckInfo => {
            if (!duckInfo.killed && duckInfo.duck.checkHit(clickX, clickY)) {
                hittedADuck = true;
                duckInfo.killed = true;
            }
        });

        const allDucksKilled = activeDucks.every(duckInfo => duckInfo.killed);
        if (allDucksKilled) {
            checkWaveEnd();
        }

        const allDucksProcessed = activeDucks.every(
            duckInfo =>
                duckInfo.killed || duckInfo.escaped || !document.body.contains(duckInfo.element)
        );
        if (allDucksProcessed) {
            console.log('All ducks processed (killed or escaped), checking wave end');
            checkWaveEnd();
        }

        if (shotsRemaining === 0 || missedShots >= maxMissedShots) {
            checkWaveEnd();
        }
        if (!hittedADuck) {
            missedShots++;
        }

        hideBullets(shotNumber);

    };

    return {
        wave,
        processShot,
        getScore: () => score,
    };
};
