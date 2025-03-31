export const Crosshair = () => {
    const crosshair = document.createElement('div');
    crosshair.classList.add('crosshair');
    document.body.appendChild(crosshair);

    let isInGameArea = false;

    function crosshairUpdatePosition(e) {
        const gameArea = document.querySelector('.gameArea');
        crosshair.style.left = `${e.clientX - 16}px`;
        crosshair.style.top = `${e.clientY - 16}px`;

        if (gameArea) {
            const rect = gameArea.getBoundingClientRect();

            // Check if the mouse is inside the game area
            isInGameArea =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            if (isInGameArea) {
                crosshair.classList.remove('forbidden');
                crosshair.classList.add('aim');
            } else {
                crosshair.classList.remove('aim');
                crosshair.classList.add('forbidden');
            }
        }
    }

    function initMouseTracking() {
        document.body.style.cursor = 'none';

        document.addEventListener('mousemove', crosshairUpdatePosition);

        crosshair.style.left = '50%';
        crosshair.style.top = '50%';
        crosshair.classList.add('forbidden');
    }

    return {
        initMouseTracking,
        isInGameArea: () => isInGameArea,
    };
};
