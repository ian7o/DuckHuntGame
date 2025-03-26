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
	dogJump: {
		PositionX: -74,
		PositionY: -60,
	},
	dogJumpSecond: {
		PositionX: -135,
		PositionY: -67,
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

	let xPos = -700;
	let yPos = container.clientHeight / 2;
	const targetX = 50;
	const moveSpeed = 15;

	setInterval(() => {
		currenctFrame = (currenctFrame + 1) % totalFrames;

		const positions = [
			dogPosition.dogWalk,
			dogPosition.dogWalkSecond,
			dogPosition.dogWalkThird,
			dogPosition.dogWalkFour,
			dogPosition.dogWalkFive,
		];

        const newPosition = [
            dogPosition.dogJump,
            dogPosition.dogJumpSecond
        ]
		const currentPosition = positions[currenctFrame];

		dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		if (xPos < targetX) {
			xPos += moveSpeed;
		}

		dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;

        
		if(xPos >= targetX){
			const currentFrame = 0;
			const currentPosition = newPosition[currentFrame];
			dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
            dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;

            
		}
	}, 150);
}
