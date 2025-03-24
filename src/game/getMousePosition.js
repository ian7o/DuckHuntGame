export const Positions = () => {
	let mouseX;
	let mouseY;

	function trackMouse() {
		document.addEventListener("mousemove", function (mousePosition) {
			mouseX = mousePosition.clientX;
			mouseY = mousePosition.clientY;
			console.log(`Mouse X: ${mouseX}, Mouse Y: ${mouseY}`);
		});
	}

	function getMouseXPosition() {
		return mouseX;
	}

	function getMouseYPosition() {
		return mouseY;
	}

	return {
		getMouseXPosition,
		getMouseYPosition,
		trackMouse,
	};
};
