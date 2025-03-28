export const duckPositions = {
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
	duckGetShot: {
		PositionX: -131,
		PositionY: -238,
	},
	duckFall: {
		PositionX: -178,
		PositionY: -237,
	},
};

// Get the first game area element
const gameArea = document.querySelector(".gameArea");

// Only create and append duck if gameArea exists
if (gameArea) {
	const duck = document.createElement("div");
	// Add the necessary classes for sprite display
	duck.classList.add("duck");
	duck.classList.add("sprite-duck");
	duck.style.backgroundPosition = `${duckPositions.initialDuckPosition.PositionX}px ${duckPositions.initialDuckPosition.PositionY}px`;
	gameArea.appendChild(duck);

	// Start the duck movement
	duckMove(duck);
}

function duckMove(duck) {
	const totalFrames = 3;
	let currentFrame = 0;

	// Set initial position of the duck
	let xPos = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	setInterval(() => {
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		// Using the predefined positions from duckPositions
		const positions = [
			duckPositions.initialDuckPosition,
			duckPositions.secondDuckPosition,
			duckPositions.thirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos + 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos + 0) % window.innerHeight; // Move the duck vertically

		duck.style.transform = `translate(${xPos}px, ${yPos}px) scale(2)`;
	}, 150);
}
