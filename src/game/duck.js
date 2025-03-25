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



	flyInitialDuckPosition: {
		PositionX: -134,
		PositionY: -157,
	},
	flySecondDuckPosition: {
		PositionX: -171,
		PositionY: -158,
	},
	flyThirdDuckPosition: {
		PositionX: -213,
		PositionY: -157,
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
	// Set the background position
	duck.style.backgroundPosition = `${duckPositions.initialDuckPosition.PositionX}px ${duckPositions.initialDuckPosition.PositionY}px`;
	gameArea.appendChild(duck);

	// Start the duck movement
	//duckMove(duck);
	duckflyForRightUp(duck);
	//duckflyForLeftUp(duck);
	//duckflyForRightDown(duck);
	//duckflyForLeftDown(duck);



}
//nao sei um nome melhor para o positionsLocated mas é so para ficar dinamico mas é onde ele vai buscar o set de animaçoes






function duckMove(duck) {
	const totalFrames = 3;
	let currentFrame = 0;

	// Start at the left edge of the game area
	let xPos = -50; // Start slightly off-screen
	let yPos = gameArea.getBoundingClientRect().height / 2;

	const gameAreaWidth = gameArea.getBoundingClientRect().width;

	setInterval(() => {
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
	let xPos = 0;
	let currentFrame = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	// Update the sprite's position and frame every second
	setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		// Using the predefined positions from duckPositions
		const positions = [
			duckPositions.flyInitialDuckPosition,
			duckPositions.flySecondDuckPosition,
			duckPositions.flyThirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos + 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos + -10) % window.innerHeight; // Move the duck vertically

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) scale(2)`;
	}, 150); // Update every 1 second
}



function duckflyForLeftUp(duck) {
	const totalFrames = 3;
	let xPos = 0;
	let currentFrame = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	// Update the sprite's position and frame every second
	setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		// Using the predefined positions from duckPositions
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
	}, 150); // Update every 1 second
}



function duckflyForRightDown(duck) {
	const totalFrames = 3;
	let xPos = 0;
	let currentFrame = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	// Update the sprite's position and frame every second
	setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		// Using the predefined positions from duckPositions
		const positions = [
			duckPositions.flyInitialDuckPosition,
			duckPositions.flySecondDuckPosition,
			duckPositions.flyThirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos + 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos + 10) % window.innerHeight; // Move the duck vertically

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) rotate(90deg) scale(2) `;
	}, 150); // Update every 1 second
}


function duckflyForLeftDown(duck) {
	const totalFrames = 3;
	let xPos = 0;
	let currentFrame = 0;
	let yPos = window.innerHeight / 2; // Start at the center of the window

	// Update the sprite's position and frame every second
	setInterval(() => {
		// Update the current frame of the sprite
		currentFrame = (currentFrame + 1) % totalFrames;

		// Set the background position to show the correct frame
		// Using the predefined positions from duckPositions
		const positions = [
			duckPositions.flyInitialDuckPosition,
			duckPositions.flySecondDuckPosition,
			duckPositions.flyThirdDuckPosition,
		];
		const currentPosition = positions[currentFrame];
		duck.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		// Move the duck smoothly around the screen
		xPos = (xPos - 10) % window.innerWidth; // Move the duck horizontally
		yPos = (yPos + 10) % window.innerHeight; // Move the duck vertically

		// Apply the new position with scale
		duck.style.transform = `translate(${xPos}px, ${yPos}px) rotate(-90deg) rotateY(180deg) scale(2) `;

	}, 150); // Update every 1 second
}