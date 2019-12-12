import {createElement} from "../utils";

class MessageNotMovies {
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
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }

  removeElement() {
    this._element = null;
  }
}

export default MessageNotMovies;
