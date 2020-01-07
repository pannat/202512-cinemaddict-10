import AbstractSmartComponent from "./abstract-smart-component";

class UserRatingComponent extends AbstractSmartComponent {
  constructor(value) {
    super();
    this._value = value;
  }

  get template() {
    return `<p class="film-details__user-rating">Your rate ${this._value}</p>`;
  }
}

export default UserRatingComponent;
