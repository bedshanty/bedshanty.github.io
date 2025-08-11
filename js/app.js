const shakeElements = document.getElementsByClassName("shake");
const flickerContainer = document.getElementById("flicker-container");

let lastTime = 0;
const interval = 1000 / 15;
const flickerIntensity = 0.015;
const backgroundShakeIntensity = 1;

const animate = (currentTime) => {
  if (!lastTime) {
    lastTime = currentTime;
  }

  if (currentTime - lastTime >= interval) {
    lastTime = currentTime;
    flickerContainer.style.opacity = `${Math.random() * flickerIntensity}`;
    for (let i = 0; i < shakeElements.length; i++) {
      const element = shakeElements[i];
      element.style.transform = `translate(${-Math.random() * backgroundShakeIntensity}px, ${-Math.random() * backgroundShakeIntensity}px)`;
    }
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
