//import { duckUi } from "../ui/ui.js";
//! implement out of bound for duck flying
//! implement duck shot
//! implement duck fall
//! implement duck score
//! implement duck miss
//! implement duck game over
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

    const movements = {
        moveRight: {
            sprites: sprites.linear,
            moveX: 10,
            moveY: 0,
            transform: (x, y) => `translate(${x}px, ${y}px) scale(2)`,
        },
        moveLeft: {
            sprites: sprites.linear,
            moveX: -10,
            moveY: 0,
            transform: (x, y) =>
                `translate(${x}px, ${y}px) rotate(334deg) rotateY(163deg) scale(2)`,
        },
        diagonalBottomLeftTopRight: {
            sprites: sprites.diagonal,
            moveX: 10,
            moveY: -10,
            transform: (x, y) => `translate(${x}px, ${y}px) scale(2)`,
        },
        diagonalBottomRightTopLeft: {
            sprites: sprites.diagonal,
            moveX: -10,
            moveY: -10,
            transform: (x, y) => `translate(${x}px, ${y}px) rotateY(150deg) scale(2)`,
        },
        diagonalTopLeftBottomRight: {
            sprites: sprites.diagonal,
            moveX: 10,
            moveY: 10,
            transform: (x, y) => `translate(${x}px, ${y}px) rotate(90deg) scale(2)`,
        },
        diagonalTopRightBottomLeft: {
            sprites: sprites.diagonal,
            moveX: -10,
            moveY: +10,
            transform: (x, y) =>
                `translate(${x}px, ${y}px) rotate(-90deg) rotateY(180deg) scale(2) `,
        },
    };

    const create = gameArea => {
        if (!gameArea) return null;

        const duckElement = document.createElement('div');
        duckElement.classList.add('duck');
        duckElement.classList.add('sprite-duck');

        //setting the initial sprite image position
        duckElement.style.backgroundPosition = `${sprites.linear.initialDuckPosition.PositionX}px ${sprites.linear.initialDuckPosition.PositionY}px`;
        gameArea.appendChild(duckElement);

        return duckElement;
    };

    const move = (duckElement, movementType) => {
        if (!movements[movementType]) return;

        const movement = movements[movementType];
        const totalFrames = 3;
        let currentFrame = 0;
        const gameArea = duckElement.parentElement;
        const gameAreaWidth = gameArea.getBoundingClientRect().width;
        const gameAreaHeight = gameArea.getBoundingClientRect().height;
        console.log(gameAreaHeight);
        

        let xPos = Math.floor(Math.random() * gameAreaWidth); // Start slightly off-screen
        let yPos = 100;

        setInterval(() => {
            //creating a cycle for the 3 frames of the sprite array from 0 1 2
            currentFrame = (currentFrame + 1) % totalFrames;

            const positions = [
                movement.sprites.initialDuckPosition,
                movement.sprites.secondDuckPosition,
                movement.sprites.thirdDuckPosition,
            ];

            const currentPosition = positions[currentFrame];
            duckElement.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

            // Move horizontally
            xPos += movement.moveX;
            yPos += movement.moveY;
            if (xPos > gameAreaWidth) {
                // Reset position when duck goes off-screen
                xPos = -50; // Reset to left side
            }
            // Apply the new position with scale
            duckElement.style.transform = movement.transform(xPos, yPos);
            return currentFrame;
        }, 150);
    };

    return {
        create,
        move,
        movements,
    };
};
