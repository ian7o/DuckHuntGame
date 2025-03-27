export const duckPositions = {
    duckFall: {
        PositionX: -178,
        PositionY: -237,
    },
};

const duckMoveFront = {
    duckFall: {
        PositionX: -178,
        PositionY: -237,
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
            scaleX: 1,
            scaleY: 1,
        },
        moveLeft: {
            sprites: sprites.linear,
            moveX: -15,
            moveY: 0,
            rotation: 'rotate(334deg) rotateY(163deg)',
            scaleX: 1,
            scaleY: 1,
        },
        diagonalBottomLeftTopRight: {
            sprites: sprites.diagonal,
            moveX: 15,
            moveY: -15,
            rotation: '',
            scaleX: 1,
            scaleY: 1,
        },
        diagonalBottomRightTopLeft: {
            sprites: sprites.diagonal,
            moveX: -15,
            moveY: -15,
            rotation: 'rotateY(150deg)',
            scaleX: 1,
            scaleY: 1,
        },
        diagonalTopLeftBottomRight: {
            sprites: sprites.diagonal,
            moveX: 15,
            moveY: 15,
            rotation: 'rotate(90deg)',
            scaleX: 1,
            scaleY: 1,
        },
        diagonalTopRightBottomLeft: {
            sprites: sprites.diagonal,
            moveX: -15,
            moveY: 15,
            rotation: 'rotate(-90deg) rotateY(180deg)',
            scaleX: 1,
            scaleY: 1,
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

        const duckElement = document.createElement('div');
        duckElement.classList.add('sprite-duck');

        duckElement.style.backgroundPosition = `${duckLinearSprites.initialDuckPosition.PositionX}px ${duckLinearSprites.initialDuckPosition.PositionY}px`;
        duckElement.style.transformOrigin = 'top left';

        gameArea.appendChild(duckElement);

        return duckElement;
    };

    const spawn = gameArea => {
        const duckElement = create(gameArea);

        const gameAreaWidth = gameArea.getBoundingClientRect().width;
        const gameAreaHeight = gameArea.getBoundingClientRect().height;

        // Calculate initial position
        let xInitialPos = Math.floor(Math.random() * (gameAreaWidth * 0.8));
        let yInitialPos = gameAreaHeight;
        console.log(yInitialPos);

        // Set position using left/top
        duckElement.style.left = `${xInitialPos}px`;
        duckElement.style.top = `${yInitialPos}px`;
        duckElement.style.transform = `scale(2)`;
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

    const updateSprite = (duckElement, sprites, currentFrame) => {
        const positions = [
            sprites.initialDuckPosition,
            sprites.secondDuckPosition,
            sprites.thirdDuckPosition,
        ];

        const currentPosition = positions[currentFrame];
        duckElement.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
    };

    const handleDuckEscape = duckElement => {
        duckElement.remove();
    };

    const move = (duckElement, movement, initialPosition) => {
        let currentMovement = movement;
        let currentFrame = 0;
        const totalFrames = 3;
        let collisionCounter = 0;

        const gameArea = duckElement.parentElement;
        const bounds = {
            width: gameArea.getBoundingClientRect().width,
            height: gameArea.getBoundingClientRect().height,
            duckWidth: duckElement.getBoundingClientRect().width,
            duckHeight: duckElement.getBoundingClientRect().height,
        };

        let xPos = initialPosition.x;
        let yPos = initialPosition.y;
        let framesCounter = 6

        const animationId = setInterval(() => {
            currentFrame = (currentFrame + 1) % totalFrames;

            updateSprite(duckElement, currentMovement.sprites, currentFrame);

            xPos += currentMovement.moveX;
            yPos += currentMovement.moveY;
            console.log(xPos, yPos);
            

            if(framesCounter <= 0){

                const collision = checkCollisions(xPos, yPos, bounds);
                if (collision) {
                    if (collisionCounter >= 1) {
                        handleDuckEscape(duckElement);
                        clearInterval(animationId);
                        return;
                    }
                    currentMovement = nextMovement(collision.direction);
                    collisionCounter++;
                }
            }else{
                framesCounter--
            }

            // Update position using left/top properties
            duckElement.style.left = `${xPos}px`;
            duckElement.style.top = `${yPos}px`;

            // Set rotation and scale separately
            duckElement.style.transform = `scale(2) ${currentMovement.rotation}`;

            return currentFrame;
        }, 150);
    };

    return {
        spawn,
        move,
        movementsOptions,
    };
};
