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
	},

	dogWithDuckFirst: {
		PositionX: -332,
		PositionY: -3,
	},
	dogWithDuckSecond: {
		PositionX: -319,
		PositionY: -63,
	},
};

const dogArea = document.querySelector('.dogArea');

const grass = document.querySelector('.grass');

if (grass) {
	const dog = document.createElement('div');
	dog.classList.add('sprite-dog');
	//dog.style.backgroundPosition = `${dogPosition.dogWalk.PositionX}px ${dogPosition.dogWalk.PositionY}px`;
	//grass.appendChild(dog);
	//to play the animatino
	//dogMove(dog, grass);
}
if(dogArea){
	const dog = document.createElement('div');
	dog.classList.add('sprite-dog');
	dogArea.appendChild(dog);
	
	//dogLaugh(dog, dogArea);
	dogWithDucks(dog, dogArea);
}


function dogMove(dog, container) {
    const totalWalkFrames = 5;
    const totalJumpFrames = 2;
    let currentWalkFrame = 0;
    let currentJumpFrame = 0;
    let dogStatus = 'walk';
  
    let xPos = 0;
    let yPos = container.clientHeight / 2;
    const targetX = container.clientWidth / 2;
    const moveSpeed = 15;
    const jumpHeight = 100;
    let initialY = yPos;
    let jumpProgress = 0;
  
    const walkPositions = [
      dogPosition.dogWalk,
      dogPosition.dogWalkSecond,
      dogPosition.dogWalkThird,
      dogPosition.dogWalkFour,
      dogPosition.dogWalkFive,
    ];
  
    const jumpPositions = [dogPosition.dogJump, dogPosition.dogJumpSecond];
    const grassHeight = container.clientHeight * 0.35;
  
    setInterval(() => {
      if (dogStatus === 'walk') {
        dog.style.zIndex = '10';
        dog.style.opacity = '1';
  
        currentWalkFrame = (currentWalkFrame + 1) % totalWalkFrames;
        const currentPosition = walkPositions[currentWalkFrame];
        dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
  
        if (xPos < targetX) {
          xPos += moveSpeed;
          dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;
        } else {
          dogStatus = 'jump';
          currentJumpFrame = 0;
          jumpProgress = 0;
        }
      } else if (dogStatus === 'jump') {
        jumpProgress += 0.1;
        const jumpCurve = 10 * jumpHeight * (jumpProgress * (1 - jumpProgress));
        yPos = initialY - jumpCurve;
        currentJumpFrame = Math.floor(jumpProgress * totalJumpFrames);
        const currentPosition = jumpPositions[Math.min(currentJumpFrame, totalJumpFrames - 1)];
  
        if (yPos > initialY - grassHeight) {
          dog.style.zIndex = '1';
          dog.style.opacity = '0';
        } else {
          dog.style.zIndex = '10';
          dog.style.opacity = '1';
        }
  
        dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
        dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;
  
        if (jumpProgress >= 1) {
          dogStatus = 'landing';
          yPos = initialY - grassHeight;
          currentJumpFrame = 1;
        }
      } else if (dogStatus === 'landing') {
        const currentPosition = jumpPositions[1];
        dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;
        dog.style.transform = `translate3d(1010px, 0px, -0px) scale(3.5)`;
        dog.style.zIndex = 0;
      }
    }, 100);
}


function dogLaugh(dog, container) {
	const totalFrames = 2;
	let currentFrame = 0;
	let moveSpeed = 10;
	let topAnimationLimit = 550;
	let downAnimationLimit = 650;
	let dogStatus = 'Laugh up';
	let xPos = container.clientWidth / 2;
	let yPos = 650;

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


function dogWithDucks(dog, container) {
	const totalFrames = 2;
	let currentFrame = 0;
	let moveSpeed = 10;
	let topAnimationLimit = 530;
	let downAnimationLimit = 650;
	let dogStatus = 'Laugh up';
	let xPos = container.clientWidth / 2;
	let yPos = 650
	let duckDeathQuantity = 2;


	setInterval(() => {
		currentFrame = (currentFrame + 1) % totalFrames;
		const positions = [
			dogPosition.dogWithDuckFirst,
			dogPosition.dogWithDuckSecond,
		];
		let currentPosition;

		if (duckDeathQuantity === 1) {
			currentPosition = positions[0];
		}
		else if (duckDeathQuantity === 2) {
			currentPosition = positions[1];
		}
		dog.style.backgroundPosition = `${currentPosition.PositionX}px ${currentPosition.PositionY}px`;

		if (dogStatus === 'Laugh up') {
			yPos += -moveSpeed
			if (yPos == topAnimationLimit) {
				dogStatus = 'Laugh down';
			}
		}
		else if (dogStatus == 'Laugh down' && yPos <= downAnimationLimit) {
			yPos += +moveSpeed
		}


		dog.style.setProperty('--x-pos', `${xPos}px`);
		dog.style.setProperty('--y-pos', `${yPos}px`);
		dog.style.zIndex = "1";
		dog.style.transform = `translate(${xPos}px, ${yPos}px) scale(3)`;

	}, 150);
}
