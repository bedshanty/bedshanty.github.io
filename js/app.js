const canvas = document.getElementById("canvas");
const flickerContainer = document.getElementById("flicker-container");

let lastTime = 0;
const interval = 1000 / 15;
const flickerIntensity = 0.015;
const backgroundShakeIntensity = 1;

function animate(currentTime) {
  if (!lastTime) {
    lastTime = currentTime;
  }

  if (currentTime - lastTime >= interval) {
    lastTime = currentTime;
    flickerContainer.style.opacity = Math.random() * flickerIntensity;
    canvas.style.left = `${-Math.random() * backgroundShakeIntensity}px`;
    canvas.style.right = `${-Math.random() * backgroundShakeIntensity}px`;
    canvas.style.top = `${-Math.random() * backgroundShakeIntensity}px`;
    canvas.style.bottom = `${-Math.random() * backgroundShakeIntensity}px`;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
