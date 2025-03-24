import {InputHandler} from '../input/input.js';
export const game = () => {
	const inputHandler = InputHandler();
    let score = 0 

	function checkIfDuckDies() {
		let mousePositionX = inputHandler.getMouseXPosition();
		let mousePositionY = inputHandler.getMouseYPosition();
		let ducks = document.querySelectorAll(".sprite-duck");

		ducks.forEach((duck) => {
			const duckRect = duck.getBoundingClientRect();
			if (checkDuckBounds(mousePositionX, mousePositionY, duckRect)){
				updateDuckClasses(duck);
                updateScore();
			}
		});
	}

	function checkDuckBounds(mousePositionX, mousePositionY, duckRect) {
		return (
			mousePositionX >= duckRect.left &&
			mousePositionX <= duckRect.right &&
			mousePositionY >= duckRect.top &&
			mousePositionY <= duckRect.bottom
		);
	}

	function updateDuckClasses(duck) {
		duck.classList.remove("sprite-duck");
		duck.classList.add("duckGetShot");
        //after dying needs to fall and after that needs to dissapear from dom
		setTimeout(() => {
			duck.classList.remove("duckGetShot");
			duck.classList.add("duckFall");
            setTimeout(() => {
                duck.remove();   
            },1000)
		}, 1000);
	}

    function updateScore(){
        //todo scores needs to update bases on type of bird after implemeting different types
        score += 100;
    }
	return {
		checkIfDuckDies,
        //to get score for ui and or render
        getScore: () => score
	};
};
