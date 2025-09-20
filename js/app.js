
// elements
const shakeElements = document.getElementsByClassName("shake");
const flickerContainer = document.getElementById("flicker-container");
const tvFlicker = document.getElementById("tv-flicker");
const checkContainer = document.getElementById("ui-check-container");

// animation values
let lastTime = 0;
const interval = 1000 / 15;
const backgroundFlickerIntensity = 0.015;
const backgroundShakeIntensity = 1;
const tvFlickerIntensity = 0.2;

const onCheckClick = () => {
  checkContainer.classList.toggle("active");
}

const animate = (currentTime) => {
  if (!lastTime) {
    lastTime = currentTime;
  }

  if (currentTime - lastTime >= interval) {
    lastTime = currentTime;
    flickerContainer.style.opacity = `${Math.random() * backgroundFlickerIntensity}`;
    tvFlicker.style.opacity = `${Math.random() * tvFlickerIntensity}`;
    for (let i = 0; i < shakeElements.length; i++) {
      const element = shakeElements[i];
      element.style.transform = `translate(${-Math.random() * backgroundShakeIntensity}px, ${-Math.random() * backgroundShakeIntensity}px)`;
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
