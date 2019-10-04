import {EventsList} from '../components/events-list';
import {Day} from '../components/day';
import {Sort} from '../components/sort';
// import {PointController} from '../controllers/point';
import {EventsListController} from '../controllers/events-list';
import {render, Position} from '../utils/utils';

const POINTS_IN_ROW = 4;

export class TripController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;
    this._points = [];
    this._sort = new Sort();
    this._eventsList = new EventsList();
    this._day = new Day(onDataChange, 2);
    this._showedTasks = POINTS_IN_ROW;
    this._subscriptions = [];
    this._eventsListController = new EventsListController(this._eventsList.getElement(), this._onDataChange.bind(this));

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this.init();
  }

  init() {
    render(this._container, this._sort.getElement(), Position.AFTERBEGIN);
    render(this._container, this._day.getElement(this._renderBoardTrips()), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
  }

  hide() {
    document.querySelector(`.trip-days__item`).classList.add(`visually-hidden`);
    document.querySelector(`.trip-events__trip-sort`).classList.add(`visually-hidden`);
    document.querySelector(`.day__info`).style.opacity = `0`;
  }

  show(points) {
    if (points !== this._points) {
      this._setTasks(points);
    }

    document.querySelector(`.trip-days__item`).classList.remove(`visually-hidden`);
    document.querySelector(`.trip-events__trip-sort`).classList.remove(`visually-hidden`);
    document.querySelector(`.day__info`).style.opacity = `1`;
  }

  _setTasks(points) {
    this._points = points;
    this._showedTasks = POINTS_IN_ROW;

    this._renderBoardTrips();
  }

  _renderBoardTrips() {
    render(this._day.getElement(), this._eventsList.getElement(), Position.BEFOREEND);
    this._eventsListController.setTasks(this._points.slice(0, this._showedTasks));
    // this._eventsList.removeElement();
    // render(this._day.getElement(), this._eventsList.getElement(), Position.BEFOREEND);
    // this._points.forEach((pointMock) => this._renderPoint(pointMock));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(points) {
    this._points = points;
    this._onDataChangeMain(this._points);

    this._renderBoardTrips();
  }

  createTask() {
    this._eventsListController.createTask();
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    this._eventsList.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `event`:
        const sortedByTitleDown = this._points.slice().sort((a, b) => a.title - b.title);
        this._eventsListController.setTasks(sortedByTitleDown);
        break;
      case `time`:
        const sortedByDateDown = this._points.slice().sort((a, b) => b.dueDate - a.dueDate);
        this._eventsListController.setTasks(sortedByDateDown);
        break;
      case `price`:
        const sortedByPrice = this._points.slice().sort((a, b) => b.price - a.price);
        this._eventsListController.setTasks(sortedByPrice);
        break;
    }
  }
}
