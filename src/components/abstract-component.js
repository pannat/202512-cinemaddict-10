import {createElement} from "../utils";

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }


  get template() {
    throw new Error(`Abstract method not implemented: getTemplate`);
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
}

export default AbstractComponent;
