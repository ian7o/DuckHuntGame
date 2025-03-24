import { duckUi } from "../ui/ui.js";


const duckPositions = {
    initialDuckPosition: {
        PositionX : -130,
        PositionY : -121
    },
    secondDuckPosition: {
        PositionX : -170,
		PositionY: -123,
	},
	thirdDuckPosition: {
		PositionX: -221,
		PositionY: -119,
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

const gameArea = document.querySelector(".game-area");
let gameAreaWidth = gameArea.offsetWidth;


const duck = document.createElement("div");
gameArea.appendChild(duck);
duck.classList.add(`sprite-duck${duckPositions.initialDuckPosition.PositionX}
    ${duckPositions.initialDuckPosition.PositionY}`);



