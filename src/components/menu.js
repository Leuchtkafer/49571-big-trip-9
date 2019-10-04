import {AbstractComponent} from './absctract-component.js';
import {menu} from '../data/data.js';

export class Menu extends AbstractComponent {
  getTemplate() {
    return `<div><h2 class="visually-hidden">Switch trip view</h2>
            <nav class="trip-controls__trip-tabs  trip-tabs">
              ${menu.map((item) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${item}</a>`).join(``)}
            </nav>
            </div>`;
  }
}
