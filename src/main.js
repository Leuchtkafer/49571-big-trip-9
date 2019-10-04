import {Menu} from './components/menu.js';
import {Filter} from './components/filter.js';
import {Route} from './components/route.js';
import {Statistics} from './components/statistics.js';
import {getPoint} from './data/data.js';
import {TripController} from './controllers/trip';
import {render, Position} from './utils/utils.js';

const POINT_COUNT = 3;

const main = document.querySelector(`.trip-main`);
const events = document.querySelector(`.trip-events`);
const siteMenu = new Menu();
const filter = new Filter();
const statistics = new Statistics();
const route = new Route();
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const pointsLink = `Table`;
const statisticLink = `Stats`;

const textNoPoints = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
let pointMocks = new Array(POINT_COUNT)
.fill(``)
.map(getPoint);

const onDataChange = (points) => {
  pointMocks = points;
};

statistics.getElement().classList.add(`visually-hidden`);

render(main, tripControls, Position.AFTERBEGIN);
render(main, route.getElement(), Position.AFTERBEGIN);
render(tripControls, siteMenu.getElement(), Position.BEFOREEND);
render(tripControls, filter.getElement(), Position.BEFOREEND);
render(events, statistics.getElement(), Position.BEFOREEND);


if (pointMocks.length === 0) {
  render(events, textNoPoints, `beforeend`);
}

// сделать пересчет при добавлении/удалении карточек
const getTripCost = () => {
  const allPrices = document.querySelectorAll(`.event__price-value`);
  let sum = 0;
  allPrices.forEach(function (item) {
    sum += +item.textContent;
    return sum;
  });
  route.getElement().querySelector(`.trip-info__cost-value`).textContent = sum;
};

const tripController = new TripController(events, onDataChange);
tripController.show(pointMocks);

siteMenu.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  switch (evt.target.innerText) {
    case pointsLink:
      statistics.getElement().classList.add(`visually-hidden`);
      tripController.show(pointMocks);
      break;
    case statisticLink:
      tripController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
  }
});

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, () => {
  tripController.createTask();
  // console.log(siteMenu.getElement().querySelector(`#${pointsLink}`));
  // siteMenu.getElement().querySelector(`#${pointsLink}`).checked = true;
});

getTripCost();

