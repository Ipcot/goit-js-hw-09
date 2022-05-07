const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;

refs.btnStart.addEventListener('click', toStartSwitchColor);
refs.btnStop.addEventListener('click', toStopSwitchColor);

refs.btnStop.disabled = true;

function toStartSwitchColor() {
  toColorBody();
  timerId = setInterval(toColorBody, 1000);
}

function toStopSwitchColor() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toColorBody() {
  refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}
