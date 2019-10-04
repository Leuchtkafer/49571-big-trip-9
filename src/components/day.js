import {AbstractComponent} from './absctract-component.js';
import {getMonthDayDateString} from '../utils/utils';

export class Day extends AbstractComponent {
  constructor(day, index) {
    super();
    this._day = day;
    this._index = index;
  }

  getTemplate() {
    const date = new Date();
    const monthDayDateString = getMonthDayDateString(date);
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._index}</span>
          <time class="day__date" datetime="${this._day}">${monthDayDateString}</time>
        </div>
        <ul class="trip-events__list"></ul>
      </li>
    `.trim();
  }
}
