import {Point} from "../components/point";
import {PointEdit} from "../components/point-edit";
import {render, Position, Mode} from '../utils/utils';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

export class PointController {
  constructor(container, data, mode, onChangeView, onDataChange) {
    this._container = container;
    this._data = data;
    this._pointView = new Point(this._data);
    this._pointEdit = new PointEdit(this._data, onDataChange);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this._create(mode);
  }

  _create(mode) {
    let renderPosition = Position.BEFOREEND;
    let currentView = this._pointView;

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._pointEdit;
    }

    flatpickr(this._pointEdit.getElement().querySelectorAll(`.event__input--time`), {
      defaultDate: this._data.time.start,
      altInput: true,
      altFormat: `d/m/y H:i`,
      enableTime: true,
      [`time_24hr`]: true,
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (mode === Mode.DEFAULT) {
          if (this._container.contains(this._pointEdit.getElement())) {
            this._container.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
          }
        } else if (mode === Mode.ADDING) {
          this._container.removeChild(currentView.getElement());
          this._onDataChange(null, null);
        }

        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._pointView.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
      this._container.replaceChild(this._pointEdit.getElement(), this._pointView.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEdit.getElement().addEventListener(`submit`, () => {
      this._container.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._pointEdit.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const formData = new FormData(this._pointEdit.getElement());

      const entry = {
        types: formData.get(`event-type`),
        city: formData.get(`event-destination`),
        price: Number(formData.get(`event-price`)),
        time: {
          start: formData.get(`event-start-time`),
          end: formData.get(`event-end-time`),
        },
        destination: formData.get(`event-destination`),
        isFavorite: formData.get(`event-favorite`) === `on`,
        // offers: new Set(formData.get(`event-offer`)),
      };
      this._onDataChange(entry, mode === Mode.DEFAULT ? this._data : null);

      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    render(this._container, currentView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this._container.contains(this._pointEdit.getElement())) {
      this._container.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
    }
  }
}
