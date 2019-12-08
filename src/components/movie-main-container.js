import {createElement} from "../utils";

class MovieMainContainer {
  constructor() {
    this._element = null;
  }

  get element() {
    if (this._element === null) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<section class="films"></section>`;
  }

  removeElement() {
    this._element = null;
  }
}

export default MovieMainContainer;
