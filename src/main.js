import { Crosshair } from './input/crosshair.js';

document.addEventListener('DOMContentLoaded', () => {
  const crosshair = Crosshair();
  crosshair.initMouseTracking();
});
