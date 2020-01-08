import AbstractComponent from "./abstract-component";

class UserRatingComponent extends AbstractComponent {
  constructor(value) {
    super();
    this._value = value;
  }

  get template() {
    return `<p class="film-details__user-rating">Your rate ${this._value}</p>`;
  }

  rerender(value) {
    this._value = value;

    const oldElement = this.element;
    const parent = this.element.parentElement;

    this.removeElement();

    const newElement = this.element;
    parent.replaceChild(newElement, oldElement);
  }
}

export default UserRatingComponent;
