import {createElement} from "../utils";

class ButtonShowMore {
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
    return `<button class="films-list__show-more">Show more</button>`;
  }

  removeElement() {
    this._element = null;
  }
}

export default ButtonShowMore;
