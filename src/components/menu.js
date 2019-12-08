import {capitalizeFirstLetter} from "../utils";
import {createElement} from "../utils";

class Menu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  get element() {
    if (this._element === null) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${this._filters.map(({name, count}) => `<a href="#${name}" class="main-navigation__item">${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span></a>
    `).join(``)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }

  removeElement() {
    this._element = null;
  }
}

export default Menu;
