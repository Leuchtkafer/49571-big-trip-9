import {AbstractComponent} from './absctract-component.js';
import {getFormatedDate, getDurationTime} from '../utils/utils';

export class Point extends AbstractComponent {
  constructor({types, offers, price, time}) {
    super();
    this._types = types;
    this._offers = offers;
    this._price = price;
    this._time = time;
  }
  getTemplate() {
    return `<div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${this._types}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._types} to airport</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${this._time.start}">${getFormatedDate(this._time.start)}</time>
          —
          <time class="event__end-time" datetime="${this._time.end}">${getFormatedDate(this._time.end)}</time>
        </p>
        <p class="event__duration">${getDurationTime(this._time.start, this._time.end)}</p>
      </div>

      <p class="event__price">
        €&nbsp;<span class="event__price-value">${this._price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${this._offers ? Array.from(this._offers).splice(Math.floor(Math.random() * 5), 2).map((it) => `<li class="event__offer">
          <span class="event__offer-title">${it.name}</span>
          + €&nbsp;<span class="event__offer-price">${it.price}</span>
         </li>`).join(``) : ``}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>`;
  }
}
