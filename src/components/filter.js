import {AbstractComponent} from './absctract-component.js';
import {filters} from '../data/data.js';

export class Filter extends AbstractComponent {
  getTemplate(isDisabled = false) {
    return `<div>
        <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
                ${filters.map((filter) => (`<div class="trip-filters__filter">
      <input 
        id="filter-${filter.title}" 
        class="trip-filters__filter-input  visually-hidden" 
        type="radio" 
        name="trip-filter" 
        value="${filter.title}" 
        ${filter.isChecked ? ` checked` : ``} 
        ${isDisabled || filter.amount <= 0 ? ` disabled` : ``}
      >
    <label class="trip-filters__filter-label" for="filter-${filter.title}">${filter.title}</label>
</div>`)).join(``)}
<button class="visually-hidden" type="submit">Accept filter</button>
</form>
</div>`;
  }
}

