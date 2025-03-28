export const InputHandler = () => {
    let mouseX;
    let mouseY;

    document.addEventListener('click', function (mousePosition) {
        mouseX = mousePosition.clientX;
        mouseY = mousePosition.clientY;
        console.log(`Mouse X: ${mouseX}, Mouse Y: ${mouseY}`);
    });

    function checkHit(duckX, duckY, duckWidth, duckHeight) {
        return (
            mouseX >= duckX &&
            mouseX <= duckX + duckWidth &&
            mouseY >= duckY &&
            mouseY <= duckY + duckHeight
        );
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
        checkHit,
    };
};
