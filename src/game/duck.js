import { InputHandler } from '../input/input.js';

export const duckDies = {
    duckFall: {
        PositionX: -178,
        PositionY: -237,
    },
    duckDead: {
        PositionX: -131,
        PositionY: -238,
    },
};

const duckLinearSprites = {
    initialDuckPosition: {
        PositionX: -130,
        PositionY: -121,
    },
    secondDuckPosition: {
        PositionX: -170,
        PositionY: -123,
    },
    thirdDuckPosition: {
        PositionX: -211,
        PositionY: -121,
    },
};

const duckDiagonalSprites = {
    initialDuckPosition: {
        PositionX: -134,
        PositionY: -157,
    },
    secondDuckPosition: {
        PositionX: -171,
        PositionY: -158,
    },
    thirdDuckPosition: {
        PositionX: -213,
        PositionY: -157,
    },
};

export const Duck = () => {
    // Use let instead of const for isAlive, since it will change
    let isAlive = true;
    let duckElement = null;
    let animationId = null;

    const sprites = {
        linear: duckLinearSprites,
        diagonal: duckDiagonalSprites,
    };

    const movementsOptions = {
        moveRight: {
            sprites: sprites.linear,
            moveX: 15,
            moveY: 0,
            rotation: '',
            scaleX: 3,
            scaleY: 3,
        },
        moveLeft: {
            sprites: sprites.linear,
            moveX: -15,
            moveY: 0,
            rotation: 'rotate(334deg) rotateY(163deg)',
            scaleX: 3,
            scaleY: 3,
        },
        diagonalBottomLeftTopRight: {
            sprites: sprites.diagonal,
            moveX: 15,
            moveY: -15,
            rotation: '',
            scaleX: 3,
            scaleY: 3,
        },
        diagonalBottomRightTopLeft: {
            sprites: sprites.diagonal,
            moveX: -15,
            moveY: -15,
            rotation: 'rotateY(150deg)',
            scaleX: 3,
            scaleY: 3,
        },
        diagonalTopLeftBottomRight: {
            sprites: sprites.diagonal,
            moveX: 15,
            moveY: 15,
            rotation: 'rotate(90deg)',
            scaleX: 3,
            scaleY: 3,
        },
        diagonalTopRightBottomLeft: {
            sprites: sprites.diagonal,
            moveX: -15,
            moveY: 15,
            rotation: 'rotate(-90deg) rotateY(180deg)',
            scaleX: 3,
            scaleY: 3,
        },
    };

    const randomBottomTopMovement = () => {
        const possibleMoves = [
            movementsOptions.diagonalBottomLeftTopRight,
            movementsOptions.diagonalBottomRightTopLeft,
        ];
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    };

    const randomTopBottomMovement = () => {
        const possibleMoves = [
            movementsOptions.diagonalTopLeftBottomRight,
            movementsOptions.diagonalTopRightBottomLeft,
        ];
        return possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    };

    const create = gameArea => {
        if (!gameArea) return null;

        const element = document.createElement('div');
        element.classList.add('sprite-duck');

        element.style.backgroundPosition = `${duckLinearSprites.initialDuckPosition.PositionX}px ${duckLinearSprites.initialDuckPosition.PositionY}px`;
        element.style.transformOrigin = 'top left';

        gameArea.appendChild(element);

        return element;
    };

    const spawn = gameArea => {
        duckElement = create(gameArea);

        const gameAreaWidth = gameArea.getBoundingClientRect().width;
        const gameAreaHeight = gameArea.getBoundingClientRect().height;

        let xInitialPos = Math.floor(Math.random() * (gameAreaWidth * 0.8));
        let yInitialPos = gameAreaHeight;

        duckElement.style.left = `${xInitialPos}px`;
        duckElement.style.top = `${yInitialPos}px`;
        duckElement.style.transform = `scale(3)`;
        duckElement.style.transition = 'top 0.5 ease-out';

        return {
            duckElement,
            initialPosition: { x: xInitialPos, y: yInitialPos },
            movement: randomBottomTopMovement(),
        };
    };

    const checkCollisions = (x, y, bounds) => {
        if (x > bounds.width - bounds.duckWidth) {
            return { direction: 'right' };
        }
        if (x < 0) {
            return { direction: 'left' };
        }
        if (y > bounds.height) {
            return { direction: 'bottom' };
        }
        if (y <= 0) {
            return { direction: 'top' };
        }
        return null;
    };

    const nextMovement = direction => {
        switch (direction) {
            case 'right':
            case 'left':
                return direction === 'right'
                    ? movementsOptions.moveLeft
                    : movementsOptions.moveRight;
            case 'top':
                return randomTopBottomMovement();
            case 'bottom':
                return randomBottomTopMovement();
            default:
                return null;
        }
    };

    const updateSprite = (element, sprites, currentFrame) => {
        const positions = [
            sprites.initialDuckPosition,
            sprites.secondDuckPosition,
            sprites.thirdDuckPosition,
        ];

        const currentPosition = positions[currentFrame];
        element.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
    };

    const handleDuckEscape = () => {
        if (duckElement && duckElement.parentElement) {
            duckElement.remove();
        }
    };

    const kill = () => {
        if (!isAlive) return;

        isAlive = false;

        if (animationId) {
            clearInterval(animationId);
        }

        const gameAreaHeight = duckElement.parentElement.getBoundingClientRect().height;

        duckElement.style.backgroundPosition = `${duckDies.duckDead.PositionX}px ${duckDies.duckDead.PositionY}px`;

        setTimeout(() => {
            duckElement.style.backgroundPosition = `${duckDies.duckFall.PositionX}px ${duckDies.duckFall.PositionY}px`;

            let rotation = 0;
            const fallInterval = setInterval(() => {
                rotation += 45; // 45 degrees increased each frame

                const currentY = parseInt(duckElement.style.top);
                const newY = currentY + 15;

                duckElement.style.transform = `scale(3) rotateY(${rotation}deg)`;
                duckElement.style.top = `${newY}px`;

                if (newY >= gameAreaHeight) {
                    clearInterval(fallInterval);
                    setTimeout(() => {
                        duckElement.remove();
                    }, 200);
                }
            }, 50);
        }, 250);
    };

    const checkHit = (x, y) => {
        if (!isAlive || !duckElement) return false;

        const duckRect = duckElement.getBoundingClientRect();

        if (
            x >= duckRect.left &&
            x <= duckRect.right &&
            y >= duckRect.top &&
            y <= duckRect.bottom
        ) {
            kill();
            return true;
        }

        return false;
    };

    const move = (element, movement, initialPosition,extraSpeed) => {
        duckElement = element;

        let currentMovement = movement;
        let currentFrame = 0;
        const totalFrames = 3;
        let collisionCounter = 0;
        let fasterSprite = 0

        const gameArea = duckElement.parentElement;
        const bounds = {
            width: gameArea.getBoundingClientRect().width,
            height: gameArea.getBoundingClientRect().height,
            duckWidth: duckElement.getBoundingClientRect().width,
            duckHeight: duckElement.getBoundingClientRect().height,
        };

        let xPos = initialPosition.x;
        let yPos = initialPosition.y;
        let framesCounter = 6;

        animationId = setInterval(() => {
            if (!isAlive) {
                clearInterval(animationId);
                return;
            }

            currentFrame = (currentFrame + 1) % totalFrames;
            updateSprite(duckElement, currentMovement.sprites, currentFrame);

            xPos += (currentMovement.moveX * extraSpeed) * 0.7;
            yPos += (currentMovement.moveY * extraSpeed) * 0.7;
            fasterSprite += 15;

            if (framesCounter <= 0) {
                const collision = checkCollisions(xPos, yPos, bounds);
                if (collision) {
                    if (collisionCounter >= 1) {
                        handleDuckEscape();
                        clearInterval(animationId);
                        return;
                    }
                    currentMovement = nextMovement(collision.direction);
                    collisionCounter++;
                }
            } else {
                framesCounter--;
            }

            duckElement.style.left = `${xPos}px`;
            duckElement.style.top = `${yPos}px`;

            duckElement.style.transform = `scale(3) ${currentMovement.rotation}`;
        }, 150 - fasterSprite );
    };

    return {
        spawn,
        move,
        checkHit,
        getIsAlive: () => isAlive,
    };
};
