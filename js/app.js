// endpoints
const endpoint = "https://bartender-api-674630912636.asia-northeast3.run.app";
const getLatestRecordUrl = endpoint + "/record/latest"

// elements - effect
const shakeElements = document.getElementsByClassName("shake");
const flickerContainer = document.getElementById("flicker-container");
const tvFlicker = document.getElementById("tv-flicker");
const checkContainer = document.getElementById("ui-check-container");

// elements - record
const recordContentContainerElement = document.getElementById("ui-check-content-container");
const recordDateTextElement = document.getElementById("ui-check-content-date");
const recordItemElements = document.getElementsByClassName("ui-check-content-item");
const recordItemElementContents = [...recordItemElements].map(item => ({
  icon: item.getElementsByClassName("ui-check-content-item-icon")[0],
  text: item.getElementsByClassName("ui-check-content-item-text")[0],
}));
const recordTotalTextElement = document.getElementById("ui-check-content-total");

// animation values
let lastTime = 0;
const interval = 1000 / 15;
const backgroundFlickerIntensity = 0.015;
const backgroundShakeIntensity = 1;
const tvFlickerIntensity = 0.2;

// task item constants
const machugiKey = "machugi"
const machugiImageUrl = "/img/icon_machugi.png"
const stickmanKey = "stickman"
const stickmanImageUrl = "/img/icon_stickman.png"

const onCheckClick = async () => {
  const onOutsideClick = (e) => {
    if (!recordContentContainerElement.contains(e.target)) {
      onCheckClick();
      document.removeEventListener("click", onOutsideClick);
    }
  }

  const isActive = checkContainer.classList.toggle("active");

  if (!isActive) {
    return;
  }

  const response = await fetch(getLatestRecordUrl);

  document.addEventListener("click", onOutsideClick);

  if (!response.ok) {
    return;
  }

  const data = await response.json();
  const record = data.record;
  const splitDate = record.date.split("-");
  const recordItems = record.items.reduce((acc, cur) => {
    const {itemId, startTime, endTime} = cur;
    const duration = endTime - startTime;

    if (!acc[itemId]) {
      acc[itemId] = 0;
    }

    acc[itemId] += duration;
    return acc;
  }, {});
  const recordItemKeys = Object.keys(recordItems);
  let totalTime = 0;

  recordDateTextElement.innerText = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;

  for (let i = 0; i < recordItemElements.length; i++) {
    const itemElement = recordItemElements[i];

    if (i >= recordItemKeys.length) {
      itemElement.classList.add("hidden");
      continue;
    }

    itemElement.classList.remove("hidden");
    const itemElementContent = recordItemElementContents[i];
    const itemKey = recordItemKeys[i];
    const time = recordItems[itemKey];

    itemElementContent.icon.src = getImageUrl(itemKey);
    itemElementContent.text.innerText = convertTimeToCost(time);
    totalTime += time;
  }

  recordTotalTextElement.innerText = convertTimeToCost(totalTime);
};

const convertTimeToCost = (time) => {
  return `€ ${Math.floor(time / 3600)},${Math.floor(time % 3600 / 60).toString().padStart(2, "0")}`
}

const getImageUrl = (key) => {
  switch (key) {
    case machugiKey:
      return machugiImageUrl;
    case stickmanKey:
      return stickmanImageUrl;
    default:
      return undefined;
  }
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
      element.style.transform = `translate(${(Math.random() - 0.5) * backgroundShakeIntensity}px, ${(Math.random() - 0.5) * backgroundShakeIntensity}px)`;
    }
  }

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
