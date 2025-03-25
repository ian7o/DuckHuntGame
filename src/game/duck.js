//import { duckUi } from "../ui/ui.js";
export const duckPositions = {
	duckFall: {
		PositionX: -178,
		PositionY: -237,
	},
};

const duckMoveFront = {
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
}
const duckPositionFly = {
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
}

const moveSet = {
	duckMoveHorizontaRight: { moveX: 10, moveY: 0, transform: (x, y) => `translate(${x}px, ${y}px) scale(2)` },
	duckMoveHorizontaLeft: { moveX: -10, moveY: 0, transform: (x, y) => `translate(${x}px, ${y}px) rotate(334deg) rotateY(163deg) scale(2)` },
	duckDiagonaHigheRight: { moveX: 10, moveY: -10, transform: (x, y) => `translate(${x}px, ${y}px) scale(2)` },
	duckDiagonaHigheLeft: { moveX: -10, moveY: -10, transform: (x, y) => `translate(${x}px, ${y}px) rotateY(150deg) scale(2)` },
	duckDiagonaLowerRight: { moveX: 10, moveY: 10, transform: (x, y) => `translate(${x}px, ${y}px) rotate(90deg) scale(2)` },
	duckDiagonaLowerLeft: { moveX: -10, moveY: +10, transform: (x, y) => `translate(${x}px, ${y}px) rotate(-90deg) rotateY(180deg) scale(2) ` },
}

// Get the first game area element
const gameArea = document.querySelector(".gameArea");

// Only create and append duck if gameArea exists
if (gameArea) {
	const duck = document.createElement("div");
	// Add the necessary classes for sprite display
	duck.classList.add("duck");
	duck.classList.add("sprite-duck");
	// Set the background position
	//maybe this line can be removed
	duck.style.backgroundPosition = `${duckMoveFront.initialDuckPosition.PositionX}px ${duckMoveFront.initialDuckPosition.PositionY}px`;
	gameArea.appendChild(duck);

	startAnimationWith3Frames(duck, duckMoveFront, moveSet.duckDiagonaLowerLeft)
}
//nao sei um nome melhor para o positionsLocated mas é so para ficar dinamico mas é onde ele vai buscar o set de animaçoes


function startAnimationWith3Frames(duck, duckAnimationSet, movement) {
	const totalFrames = 3;
	let currentFrame = 0;

	// Start at the left edge of the game area
	let xPos = 0; // Start slightly off-screen
	let yPos = gameArea.getBoundingClientRect().height / 2;

	const gameAreaWidth = gameArea.getBoundingClientRect().width;

	setInterval(() => {
		currentFrame = (currentFrame + 1) % totalFrames;

		const positions = [
			duckAnimationSet.initialDuckPosition,
			duckAnimationSet.secondDuckPosition,
			duckAnimationSet.thirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move horizontally
		xPos += movement.moveX;
		yPos += movement.moveY;
		if (xPos > gameAreaWidth) {
			// Reset position when duck goes off-screen
			xPos = -50; // Reset to left side
		}
		// Apply the new position with scale
		duck.style.transform = movement.transform(xPos, yPos);
		return currentFrame;
	}, 150);
}
