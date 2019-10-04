import {AbstractComponent} from './absctract-component.js';

export class Route extends AbstractComponent {
  getTemplate() {
    return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam — ... — Amsterdam</h1>

              <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
            </div><p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">1230</span>
            </p></section>`;
  }
}

