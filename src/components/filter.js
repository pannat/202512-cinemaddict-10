import {capitalizeFirstLetter} from "../utils/common";
import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

class FilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  get template() {
    return `<nav class="main-navigation">
    ${this._filters.map(({name, count, checked}) => `<a href="#${name}" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">${capitalizeFirstLetter(name)}
        ${name === FilterType.ALL_MOVIES ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>
    `).join(``)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  };

  set filterChangeHandler(handler) {
    this._filterChangeHandler = (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      handler(evt.target.getAttribute(`href`).slice(1));
    };
  }

  recoveryListeners() {
    this.element.addEventListener(`click`, this._filterChangeHandler);
  }
}

export default FilterComponent;
