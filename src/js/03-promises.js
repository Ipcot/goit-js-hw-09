import { Notify } from 'notiflix/build/notiflix-notify-aio';
import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector("form"),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  button: document.querySelector('button'),
}

refs.form.addEventListener("click", onSubmitBtnHandler);
refs.form.addEventListener("input", throttle(formHandler, 500));

let formInputData = {
  delay: '',
  step: '',
  amount: '',
};

function formHandler(e) {
formInputData[e.target.name] = Number(e.target.value);
  
}

function onSubmitBtnHandler(e) {
  if (e.target === refs.button) {
      e.preventDefault();
  toStartMakePromises();
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      }
    }, delay);
    })

  
}


function toStartMakePromises() {

  let { amount, delay, step } = formInputData
  
  for (let position = 1; position <= amount; position += 1) {
  
  createPromise(position, delay).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    delay += step
    
}
};


