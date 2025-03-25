const dogPosition = {
	dogWalk: {
		PositionX: -5,
		PositionY: -3,
	},
	dogWalkSecond: {
		PositionX: -66,
		PositionY: -1,
	},
	dogWalkThird: {
		PositionX: -126,
		PositionY: -1,
	},
	dogWalkFour: {
		PositionX: -184,
		PositionY: -3,
	},
	dogWalkFive: {
		PositionX: -245,
		PositionY: -3,
	},
};

const gameArea = document.querySelector(".gameArea");

if (gameArea) {
	const dog = document.createElement("div");

	dog.classList.add("sprite-dog");

	dog.style.backgroundPosition = `${dogPosition.dogWalk.PositionX}px ${dogPosition.dogWalk.PositionY}px`;

	gameArea.appendChild(dog);

	dogMove(dog, gameArea);
}

function dogMove(dog, container) {
	const totalFrames = 5;
	let currenctFrame = 0;

	let xPos = 0;
	let yPos = container.clientHeight / 2;

	setInterval(() => {
		currenctFrame = (currenctFrame + 1) % totalFrames;

		const positions = [
			dogPosition.dogWalk,
			dogPosition.dogWalkSecond,
			dogPosition.dogWalkThird,
			dogPosition.dogWalkFour,
			dogPosition.dogWalkFive,
		];
		const currentPosition = positions[currenctFrame];

		dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		xPos = (xPos + 10) % container.clientHeight;
		yPos = (yPos + 0) % container.clientHeight;

		dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;
	}, 150);
}
