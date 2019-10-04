import {PointController} from './point';
import {Mode} from '../utils/utils';
import {getPoint} from '../data/data.js';

const defaultPoint = getPoint();

export class EventsListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChangeMain = onDataChange;

    this._creatingPoint = null;
    this._subscriptions = [];
    this._points = [];

    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  setTasks(points) {
    this._points = points;
    this._subscriptions = [];

    this._container.innerHTML = ``;
    this._points.forEach((point) => this._renderPoint(point));
  }

  createTask() {
    if (this._creatingPoint) {
      return;
    }

    const defaultTask = {
      types: defaultPoint.types,
      picture: defaultPoint.picture,
      cities: defaultPoint.cities,
      price: defaultPoint.price,
      offers: defaultPoint.offers,
      destination: defaultPoint.dueDate,
      time: defaultPoint.time,
      isFavorite: false,
    };
    this._creatingPoint = new PointController(this._container, defaultTask, Mode.ADDING, this._onChangeView, (...args) => {
      this._creatingPoint = null;
      this._onDataChange(...args);
    });
  }

  _renderPoint(point) {
    const pointController = new PointController(this._container, point, Mode.DEFAULT, this._onChangeView, this._onDataChange);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    const index = this._points.findIndex((point) => point === oldData);

    if (newData === null) {
      this._points = [...this._points.slice(0, index), ...this._points.slice(index + 1)];
    } else if (oldData === null) {
      this._points = [newData, ...this._points];
    } else {
      this._points[index] = newData;
    }

    this.setTasks(this._points);

    this._onDataChangeMain(this._points);
  }
}
