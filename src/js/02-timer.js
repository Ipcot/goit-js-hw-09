import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  div: document.querySelector('.timer'),
};

refs.startBtn.disabled = true;
let timerID = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
        Notify.failure('Please choose a date in the future');
    //   alert('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0];
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', onBtnClick);
    }
  },
};

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  for (let key in value) {
    value[key] = `${value[key]}`.padStart(2, 0);
  }
  return value;
}

function startCount(setData) {
  timerID = setInterval(() => {
    const msOdds = setData - Date.now();
    const formatedDate = addLeadingZero(convertMs(msOdds));
    refs.days.textContent = formatedDate.days;
    refs.hours.textContent = formatedDate.hours;
    refs.minutes.textContent = formatedDate.minutes;
      refs.seconds.textContent = formatedDate.seconds;
      refs.div.style.backgroundColor = `${getRandomHexColor()}`;
      refs.div.style.color = `${getRandomHexColor()}`;
    if (
      formatedDate.days === '00' &&
      formatedDate.hours === '00' &&
      formatedDate.minutes === '00' &&
      formatedDate.seconds === '00'
    ) {
      clearInterval(timerID);
    }
  }, 1000);
}

function onBtnClick() {
  refs.startBtn.disabled = true;
  startCount(selectedDate);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

