import {createElement} from "../utils/render";
import {HIDDEN_CLASS} from "../const";

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }


  get template() {
    throw new Error(`Abstract method not implemented: get template`);
  }

  get element() {
    if (this._element === null) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}

export default AbstractComponent;
