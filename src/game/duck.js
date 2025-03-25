//import { duckUi } from "../ui/ui.js";
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

	flyInitialDuckPosition: {
		PositionX: -130,
		PositionY: -121,
	},
	flySecondDuckPosition: {
		PositionX: -170,
		PositionY: -123,
	},
	flyThirdDuckPosition: {
		PositionX: -211,
		PositionY: -121,
	}
};



// Get the first game area element
const gameArea = document.querySelector(".gameArea");

// Only create and append duck if gameArea exists
if (gameArea) {
	const duck = document.createElement("div");
	// Add the necessary classes for sprite display
	duck.classList.add("duck");
	duck.classList.add("sprite-duck");
	// Set the background position
	duck.style.backgroundPosition = `${duckPositions.initialDuckPosition.PositionX}px ${duckPositions.initialDuckPosition.PositionY}px`;
	gameArea.appendChild(duck);

	// Start the duck movement (currently commented out)
	//duckflyForLeftUp(duck);
	//duckMove(duck)
	duckflyForRightUp(duck)
}



function duckMove(duck) {
	const totalFrames = 3;
	let currentFrame = 0;

	// Start at the left edge of the game area
	let xPos = -50; // Start slightly off-screen
	let yPos = gameArea.getBoundingClientRect().height / 2;

	const gameAreaWidth = gameArea.getBoundingClientRect().width;

	return setInterval(() => {
		currentFrame = (currentFrame + 1) % totalFrames;

		const positions = [
			duckPositions.initialDuckPosition,
			duckPositions.secondDuckPosition,
			duckPositions.thirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move horizontally
		xPos += 10;

		// Reset position when duck goes off-screen
		if (xPos > gameAreaWidth) {
			xPos = -50; // Reset to left side
		}

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) scale(2)`;
	}, 150);
}

function duckflyForRightUp(duck) {
	const totalFrames = 3;
	let currentFrame = 0;
	let xPos = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	return setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		const positions = [
			duckPositions.flyInitialDuckPosition,
			duckPositions.flySecondDuckPosition,
			duckPositions.flyThirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos + 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos - 10) % window.innerHeight; // Move the duck vertically

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) scale(2)`;
	}, 150);
}

function duckflyForLeftUp(duck) {
	const totalFrames = 3;
	let currentFrame = 0;
	let xPos = window.innerWidth; // Start from the right side of the screen
	let yPos = window.innerHeight / 2; // Start at the center of the window

	return setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		const positions = [
			duckPositions.flyInitialDuckPosition,
			duckPositions.flySecondDuckPosition,
			duckPositions.flyThirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos - 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos - 10) % window.innerHeight; // Move the duck vertically

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) rotateY(150deg) scale(2)`;
	}, 150);
}

function duckflyForRightDown(duck) {
	const totalFrames = 3;
	let currentFrame = 0;
	let xPos = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	return setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		const positions = [
			duckPositions.flyInitialDuckPosition,
			duckPositions.flySecondDuckPosition,
			duckPositions.flyThirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos + 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos + 0) % window.innerHeight; // Move the duck vertically

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) scale(2)`;
	}, 150);
}