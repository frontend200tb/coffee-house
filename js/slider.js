// slider
const leftBtn = document.querySelector('.js-arrow-left');
const rightBtn = document.querySelector('.js-arrow-right');
const slider = document.querySelector('.js-row-slider');
const sliderItem = document.querySelector('.js-coffee-card');
const controls = Array.from(document.querySelectorAll('.js-slider__control'));

let autoId = null;
let intervalId = null;
let clearIntervalId = null;
let start = null;

let zero;
let change;


leftBtn.addEventListener("click", showPrevCard);
rightBtn.addEventListener("click", showNextCard);
slider.addEventListener("mouseover", pauseSlider);
slider.addEventListener("mouseout", resumeSlider);

// Initial
initial();

function initial() {
  progressBarHandler();
  autoId = setInterval(() => {
    showNextCard();
  }, 5000);
}

function toggleProgressBar(leftBtnId, rightBtnId) {
  const prev = controls[leftBtnId - 1];
  const next = controls[+rightBtnId - 1];
  prev.classList.remove('control-active');
  next.classList.add('control-active');
  prev.children[0].style.transform = `translateX(${0 + "%"})`;
}

function showPrevCard() {
  clearInterval(autoId);
  clearInterval(intervalId);
  clearInterval(clearIntervalId);
  const leftBtn = controls.find((item) =>
    item.classList.contains('control-active')
  );
  const leftBtnId = leftBtn.dataset.id;
  const nextId = +leftBtnId - 1;
  const rightBtnId = nextId === 0 ? 3 : nextId;
  toggleProgressBar(leftBtnId, rightBtnId);
  const translateWidth = sliderItem.clientWidth;
  const translation = calculateTranslation(rightBtnId, translateWidth);
  slider.style.transform = `translateX(-${translation + "px"})`;
  initial();
}

function showNextCard() {
  clearInterval(autoId);
  clearInterval(intervalId);
  clearInterval(clearIntervalId);
  const leftBtn = controls.find((item) =>
    item.classList.contains('control-active')
  );
  const leftBtnId = leftBtn.dataset.id;
  const nextId = +leftBtnId + 1;
  const rightBtnId = nextId === 4 ? 1 : nextId;
  toggleProgressBar(leftBtnId, rightBtnId);
  const translateWidth = sliderItem.clientWidth;
  const translation = calculateTranslation(rightBtnId, translateWidth);
  slider.style.transform = `translateX(-${translation + "px"})`;
  initial();
}

function calculateTranslation(rightBtnId, translateWidth) {
  return rightBtnId == 2
    ? translateWidth
    : rightBtnId == 3
    ? 2 * translateWidth
    : 0;
}

function progressBarHandler() {
  const progressBar = controls.find((item) =>
    item.classList.contains('control-active')
  ).children[0];

  start = Date.now();

  intervalId = setInterval(() => {
    const point = (((Date.now() - start) / 5000) * 100).toFixed();
    progressBar.style.transform = `translateX(${point + "%"})`;
  }, 1);
  clearIntervalId = setTimeout(() => {
    clearInterval(intervalId);
  }, 5000);
}

function pauseSlider() {
  clearInterval(autoId);
  clearInterval(intervalId);
  clearInterval(clearIntervalId);
}

function resumeSlider() {
  initial();
}
