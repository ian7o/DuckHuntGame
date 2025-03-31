import { Duck } from './duck.js';
import { InputHandler } from '../input/input.js';
import { Dog } from './dog.js';

export const Game = () => {
    let score = 0;
    let currentWave = 0;
    let currentRound = 1;
    let shotsRemaining = 3;
    let ducksShotThisRound = 0;
    let ducksRequiredToAdvance = 6;
    let missedShots = 0;
    let maxMissedShots = 2;
    let escapedDucks = 0;
    let activeDucks = [];
    let waveInProgress = false;
    let canShoot = false;
    let currentHittedDucks = 0;
    let isStartingNewWave = false;
    let currentNumberOfHitForDog = 0;

    const sounds = {
        shot: new Audio('./assets/sounds/shot.mp3'),
        duckFall: new Audio('./assets/sounds/duckFalling.mp3'),
        dogLaugh: new Audio('./assets/sounds/dogLaugh.mp3'),
        gameOver: new Audio('./assets/sounds/lose.mp3'),
        nextRound: new Audio('./assets/sounds/nextRound.mp3'),
        startGame: new Audio('assets/sounds/startGame.mp3'),
    };

    const dog = Dog();
    const gameArea = document.querySelector('.gameArea');
    const mainMenu = document.querySelector('.mainMenu');
    const gameOverMenu = document.querySelector('.gameOverMenu');
    const inputHandler = InputHandler();

    //*GAME INIT
    const startGame = () => {
        mainMenu.remove();
        sounds.startGame.play();
        dog.move();
        setTimeout(() => {
            wave();
        }, 11000);
    };

    const restartGame = () => {
        gameOverMenu.style.display = 'none';

        score = 0;
        currentWave = 0;
        currentRound = 1;
        shotsRemaining = 3;
        ducksShotThisRound = 0;
        ducksRequiredToAdvance = 6;
        missedShots = 0;
        maxMissedShots = 2;
        escapedDucks = 0;
        activeDucks = [];
        waveInProgress = false;
        canShoot = false;
        currentHittedDucks = 0;
        isStartingNewWave = false;
        currentNumberOfHitForDog = 0;

        const scoreCounter = document.querySelector('.scoreCounter');
        scoreCounter.textContent = '0'.padStart(6, '0');
        updateRoundCounter();
        resetDucksKilledDisplay();
        resetShootsDisplay();

        setTimeout(() => {
            wave();
        }, 250);
    };

    //* GAME FLOW CONTROL*

    const wave = () => {
        if (isStartingNewWave) return;

        currentWave++;
        shotsRemaining = 3;
        activeDucks = [];
        missedShots = 0;
        waveInProgress = false;
        canShoot = false;

        setTimeout(() => {
            spawnDucksForWave();
        }, 3000);
    };

    const spawnDucksForWave = () => {
        const numDucks = 2;
        canShoot = true;

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

    const checkWaveEnd = () => {
        if (waveInProgress) return;

        const allDucksProcessed = activeDucks.every(
            duck => duck.killed || duck.escaped || !document.body.contains(duck.element)
        );

        const outOfShots = shotsRemaining === 0;

        if (allDucksProcessed || outOfShots) {
            waveInProgress = true;

            const escapedDucksInWave = activeDucks.filter(
                duck => duck.escaped || (!duck.killed && !document.body.contains(duck.element))
            ).length;

            const ducksShotInWave = activeDucks.filter(duck => duck.killed).length;
            ducksShotThisRound += ducksShotInWave;

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
        if (isStartingNewWave) return;
        isStartingNewWave = true;

        sounds.nextRound.play();

        currentWave = 0;
        currentRound++;
        ducksShotThisRound = 0;
        ducksRequiredToAdvance++;
        currentHittedDucks = 0;

        updateRoundCounter();
        resetDucksKilledDisplay();
        resetShootsDisplay();
        setTimeout(() => {
            isStartingNewWave = false;
            wave();
        }, 2000);
    };

    const startNextWave = () => {
        updateRoundDisplay();

        setTimeout(() => {
            resetShootsDisplay();
            setTimeout(() => {
                wave();
            }, 100);
        }, 1000);
    };

    const gameOver = () => {
        sounds.gameOver.play();
        gameOverMenu.style.display = 'flex';
        gameOverMenu.querySelector('.finalScore').textContent = `Score : ${score}`;
    };

    //* PLAYER INPUT HANDLING*

    const processShot = () => {
        if (!canShoot || shotsRemaining === 0) return;

        const shotNumber = 3 - shotsRemaining + 1;
        shotsRemaining--;
        let hittedADuck = false;
        let clickX = inputHandler.getMouseXPosition();
        let clickY = inputHandler.getMouseYPosition();

        activeDucks.forEach(duckInfo => {
            if (!duckInfo.killed && duckInfo.duck.checkHit(clickX, clickY)) {
                currentHittedDucks++;
                currentNumberOfHitForDog++;
                duckInfo.killed = true;
                hittedADuck = true;
                sounds.shot.play();
                sounds.duckFall.play();

                dog.withDucks(currentNumberOfHitForDog);
                if (currentNumberOfHitForDog === 2) {
                    currentNumberOfHitForDog = 0;
                }
                updateScore();
                updateDucksKilledDisplay();
            }
        });

        if (!hittedADuck) {
            missedShots++;
            dog.laugh();
            sounds.dogLaugh.play();
        }
        checkForEscapedDucks();

        if (shotsRemaining === 0 && activeDucks.some(duck => !duck.killed && !duck.escaped)) {
            cleanupRemainingDucks();
        }

        const allDucksKilled = activeDucks.every(duckInfo => duckInfo.killed);
        const allDucksProcessed = activeDucks.every(
            duckInfo =>
                duckInfo.killed || duckInfo.escaped || !document.body.contains(duckInfo.element)
        );

        if (
            allDucksKilled ||
            allDucksProcessed ||
            shotsRemaining === 0 ||
            missedShots >= maxMissedShots
        ) {
            checkWaveEnd();
        }

        hideBullets(shotNumber);
    };

    //* DUCK MANAGEMENT*

    const checkForEscapedDucks = () => {
        activeDucks.forEach(duckInfo => {
            if (!duckInfo.killed && !duckInfo.escaped && duckInfo.element) {
                const duckRect = duckInfo.element.getBoundingClientRect();
                const gameAreaRect = gameArea.getBoundingClientRect();

                if (
                    duckRect.right < gameAreaRect.left ||
                    duckRect.left > gameAreaRect.right ||
                    duckRect.bottom < gameAreaRect.top ||
                    duckRect.top > gameAreaRect.bottom + 100
                ) {
                    duckInfo.escaped = true;
                    console.log('Duck escaped!');
                }
            }
        });
    };

    const cleanupRemainingDucks = () => {
        activeDucks.forEach(duckInfo => {
            if (
                !duckInfo.killed &&
                !duckInfo.escaped &&
                duckInfo.element &&
                document.body.contains(duckInfo.element)
            ) {
                duckInfo.escaped = true;

                duckInfo.element.classList.add('duckEscape');

                setTimeout(() => {
                    if (duckInfo.element && document.body.contains(duckInfo.element)) {
                        duckInfo.element.remove();
                    }
                }, 1000);
            }
        });
    };

    //* UI UPDATES*

    function updateScore() {
        const scoreCounter = document.querySelector('.scoreCounter');
        score += 100;
        scoreCounter.textContent = score.toString().padStart(6, '0');
    }

    const updateRoundCounter = () => {
        const roundCounter = document.querySelector('.roundCounter');
        roundCounter.textContent = currentRound;
    };

    const updateRoundDisplay = () => {
        // TODO: Implement round display update
    };

    const updateDucksKilledDisplay = () => {
        const allDucksIconsContainers = document.querySelectorAll('.duckIcon');
        const currentHitContainer = allDucksIconsContainers[currentHittedDucks - 1];

        if (currentHitContainer) {
            const whiteDuck = currentHitContainer.querySelector('.whiteDuck');
            const redDuck = currentHitContainer.querySelector('.redDuck');

            if (whiteDuck) whiteDuck.style.display = 'none';
            if (redDuck) redDuck.style.display = 'block';
        }
    };

    //* UI RESET FUNCTIONS*

    const resetDucksKilledDisplay = () => {
        const allWhiteDuckIcons = document.querySelectorAll('.whiteDuck');
        const allRedDuckIcons = document.querySelectorAll('.redDuck');

        allWhiteDuckIcons.forEach(duck => {
            duck.style.display = 'block';
        });

        allRedDuckIcons.forEach(duck => {
            duck.style.display = 'none';
        });
    };

    const resetShootsDisplay = () => {
        const divsThatHideBullets = document.querySelectorAll('.hideBullet');
        divsThatHideBullets.forEach(div => {
            div.remove();
        });

        //sometimes arent properly remvoed from dom
        const bulletsContainer = document.querySelector('.bulletsContainer');
        if (bulletsContainer) {
            bulletsContainer.innerHTML = ''; // Remove all child elements
        }
    };

    const hideBullets = shotNumber => {
        const bulletsContainer = document.querySelector('.bulletsContainer');

        let positionClass;
        if (shotNumber === 1) positionClass = 'firstShootHide';
        else if (shotNumber === 2) positionClass = 'secondShootHide';
        else if (shotNumber === 3) positionClass = 'thirdShootHide';

        const hideDiv = document.createElement('div');
        hideDiv.classList.add(positionClass);
        hideDiv.classList.add('hideBullet');
        hideDiv.style.display = 'block';

        bulletsContainer.appendChild(hideDiv);
    };

    //* PUBLIC INTERFACE*

    return {
        wave,
        processShot,
        getScore: () => score,
        startGame,
        restartGame,
    };
};
