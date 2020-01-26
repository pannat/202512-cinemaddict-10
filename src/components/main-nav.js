import {capitalizeFirstLetter} from "../utils/common";
import AbstractComponent from "./abstract-component";
import {FilterType} from "../const";

class MainNavComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
    this._statsIsActive = filters.every((filter) => !filter.checked);
  }

  get template() {
    return `<nav class="main-navigation">
    ${this._filters.map(({name, count, checked}) => `<a href="#${name}" class="main-navigation__item ${checked ? `main-navigation__item--active` : ``}">${capitalizeFirstLetter(name)}
        ${name === FilterType.ALL_MOVIES ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>
    `).join(``)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional ${this._statsIsActive ? `main-navigation__item--active` : ``}">Stats</a>
  </nav>`;
  }

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

export default MainNavComponent;
