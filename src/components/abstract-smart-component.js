import AbstractComponent from "./abstract-component";

class AbstractSmartComponent extends AbstractComponent {
  constructor() {
    super();
  }

  rerender() {
    const oldElement = this.element;
    const parent = this.element.parentElement;

    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, oldElement);
    this.recoveryListeners();
  }

  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }
}

export default AbstractSmartComponent
