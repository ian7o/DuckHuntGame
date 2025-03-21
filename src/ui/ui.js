

export const Duck = () => {
	const duck = document.createElement("div");
	duck.classList.add("duck");
	duck.classList.add("initialDuckPosition");
	let duckPositionX = document.querySelector(".duck").offsetLeft;

	return duck;
};
