export const Positions = () => {
  let mouseX;
  let mouseY;

  document.addEventListener("mousemove", function (mousePosition) {
    mouseX = mousePosition.clientX;
    mouseY = mousePosition.clientY;

    function getMouseXPosition() {
      return mouseX;
    }

    function getMouseYPosition() {
      return mouseY;
    }

    console.log(`Mouse X: ${getMouseXPosition()}, Mouse Y: ${getMouseYPosition()}`);
  });


  return {
    getMouseXPosition,
    getMouseYPosition
  };
}