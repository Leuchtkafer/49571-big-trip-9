import {AbstractComponent} from './absctract-component.js';
import {getDateMonthFormated} from '../utils/utils';

export class PointEdit extends AbstractComponent {
  constructor({types, picture, cities, price, offers, destination, time, isFavorite}, onDataChange) {
    super();
    this._types = types;
    this._picture = picture;
    this._cities = cities;
    this._price = price;
    this._offers = offers;
    this._destination = destination;
    this._time = time;
    this._isFavorite = isFavorite || false;
    this._onDataChange = onDataChange;

    this._subscribeOnEvents();
  }

  getTemplate() {
    const types = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
    return `<form class="event--edit" action="#" method="post" id="form">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${this._types}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" value="${this._types}" type="checkbox" name="event-type-icon">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
                ${types.map((item, index) => (index <= 6 ? `<div class="event__type-item">
                <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === this._types ? `checked` : ``}>
                <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
              </div>` : ``)).join(``)}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
                ${types.map((item, index) => (index > 6 ? `<div class="event__type-item">
                <input id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}" ${item === this._types ? `checked` : ``}>
                <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1">${item}</label>
              </div>` : ``)).join(``)}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${this._types} at
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Saint Petersburg" list="destination-list-1">
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateMonthFormated(this._time.start)}">
          —
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateMonthFormated(this._time.end)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">

        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
              ${this._offers ? (Array.from(this._offers).map((offer) => (`
                <div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.shortName}-1" type="checkbox" name="event-offer" ${offer.isChecked ? `checked` : ``}>
                  <label class="event__offer-label" for="event-offer-${offer.shortName}-1">
                    <span class="event__offer-title">${offer.name}</span>
                    +
                    €&nbsp;<span class="event__offer-price">30</span>
                  </label>
                </div>`.trim()))).join(``) : ``}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${this._destination}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              <img class="event__photo" src="${this._picture}" alt="Event photo">
            </div>
          </div>
        </section>
      </section>
    </form>`;
  }

  _subscribeOnEvents() {
    this.getElement()
    .querySelector(`.event__reset-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onDataChange(``, null);
    });
  }
}
