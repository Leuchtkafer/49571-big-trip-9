import moment from 'moment';

const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomFromObject = (obj) => Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];

const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const getMonthDayDateString = (date) => date.toDateString().slice(4, 10);
const getRandomNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getFormatedDate = (timestamp) => moment(timestamp).format(`HH:mm`);
const toTwoDigitNumber = (number) => String(`0` + number).slice(-2);

const getRandomTime = () => {
  const randomHour = getRandomNumberInRange(1, 7);
  const randomMinutes = getRandomNumberInRange(1, 59);
  return (randomHour * randomMinutes * 60 * 1000);
};

const getRandomTimeInterval = () => {
  const start = Date.now() + getRandomTime() + 1 + getRandomNumberInRange(1, 5) * 24 * 60 * 60 * 1000;
  const end = start + getRandomTime();

  return {
    start,
    end
  };
};

// как конвертировать обратно в миллисекунды???
const getDurationTime = (startTimestamp, endTimestamp) => {
  const duration = moment.duration(moment(endTimestamp).diff(moment(startTimestamp)));
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();

  const dayString = days ? (toTwoDigitNumber(days) + `D `) : ``;
  const hourString = hours ? (toTwoDigitNumber(hours) + `H `) : ``;
  const minuteString = minutes ? (toTwoDigitNumber(minutes) + `M`) : ``;

  return `${dayString}${hourString}${minuteString}`;
};

const getDateMonthFormated = (timestamp) => moment(timestamp).format(`DD/MM/YY HH:mm`);

export {getRandomFromArray, Position, createElement, render, unrender, getRandomFromObject, getMonthDayDateString, getRandomTimeInterval, getFormatedDate, getDurationTime, getDateMonthFormated, Mode};
