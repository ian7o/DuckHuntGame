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

	dogLaughFirst: {
		PositionX: -197,
		PositionY: -63,
	},
	dogLaughSecond: {
		PositionX: -257,
		PositionY: -63,
	}
};

const gameArea = document.querySelector('.dogArea');

if (gameArea) {
	const dog = document.createElement('div');
	dog.classList.add('sprite-dog');
	dog.style.backgroundPosition = `${dogPosition.dogWalk.PositionX}px ${dogPosition.dogWalk.PositionY}px`;
	gameArea.appendChild(dog);
	//dogMove(dog, gameArea);
	dogLaugh(dog, gameArea)
}

function dogMove(dog, container) {
	const totalFrames = 5;
	let currentFrame = 0;
	let dogStatus = 'walk'; // Initial status

	let xPos = 0;
	let yPos = container.clientHeight / 2;
	const targetX = container.clientWidth / 2;
	const moveSpeed = 15;
	const jumpHeight = 100;
	let initialY = yPos;

	setInterval(() => {
		if (dogStatus === 'walk') {
			currentFrame = (currentFrame + 1) % totalFrames;
			const positions = [
				dogPosition.dogWalk,
				dogPosition.dogWalkSecond,
				dogPosition.dogWalkThird,
				dogPosition.dogWalkFour,
				dogPosition.dogWalkFive,
			];
			const currentPosition = positions[currentFrame];
			dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

			if (xPos < targetX) {
				xPos += moveSpeed;
				dog.style.setProperty('--x-pos', `${xPos}px`);
				dog.style.setProperty('--y-pos', `${yPos}px`);
				dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;
			} else {
				dogStatus = 'jump up'; // Change status to jump up
				currentFrame = 0;
			}
		} else if (dogStatus === 'jump up') {
			const jumpFrames = [dogPosition.dogJump, dogPosition.dogJumpSecond];
			currentFrame = (currentFrame);
			const currentPosition = jumpFrames[currentFrame];

			yPos = Math.max(initialY - jumpHeight, yPos - moveSpeed); // Move Y position upward
			dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
			dog.style.setProperty('--x-pos', `${xPos}px`);
			dog.style.setProperty('--y-pos', `${yPos}px`);

			if (yPos <= initialY - jumpHeight) {
				dogStatus = 'jump down'; // Change status to jump down
				currentFrame = 0;
			}
		} else if (dogStatus === 'jump down') {
			const jumpFrames = [dogPosition.dogJumpSecond, dogPosition.dogJump];
			currentFrame = (currentFrame);
			const currentPosition = jumpFrames[currentFrame];

			yPos = Math.min(initialY, yPos + moveSpeed); // Move Y position downward
			dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
			dog.style.setProperty('--x-pos', `${xPos}px`);
			dog.style.setProperty('--y-pos', `${yPos}px`);

			if (yPos >= initialY) {
				dogStatus = 'hide';
			}
		} else if (dogStatus === 'hide') {
			dog.style.backgroundPosition = `${dogPosition.dogJumpSecond.PositionX}px ${dogPosition.dogJumpSecond.PositionY}px`;
			dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;
			dog.style.zIndex = '-1';
		}
	}, 150);
}


function dogLaugh(dog, container) {
	const totalFrames = 2;
	let currentFrame = 0;
	let moveSpeed = 10;
	let topAnimationLimit = 550;
	let downAnimationLimit = 650;
	let dogStatus = 'Laugh up';
	console.log(container.clientWidth / 2)
	let xPos = container.clientWidth / 2;
	console.log(container.clientHeight)
	let yPos = 650
	//let yPos = 550


	setInterval(() => {
		currentFrame = (currentFrame + 1) % totalFrames;
		const positions = [
			dogPosition.dogLaughFirst,
			dogPosition.dogLaughSecond,
		];
		const currentPosition = positions[currentFrame];
		dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		if (dogStatus === 'Laugh up') {
			yPos += -moveSpeed
			if (yPos == topAnimationLimit) {
				dogStatus = 'Laugh down';
			}
		}
		else if (dogStatus == 'Laugh down') {
			if (yPos <= downAnimationLimit) {
				yPos += +moveSpeed
			}
		}

		dog.style.setProperty('--x-pos', `${xPos}px`);
		dog.style.setProperty('--y-pos', `${yPos}px`);
		dog.style.zIndex = "1";
		dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;
	}, 150);
}
