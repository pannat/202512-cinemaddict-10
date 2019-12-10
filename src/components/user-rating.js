import {createElement} from "../utils";

class UserRating {
  constructor(count) {
    this._userRank = this.calculateUserRank(count);
    this._element = null;
  }

  get element() {
    if (this._element === null) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }

  removeElement() {
    this._element = null;
  }

  calculateUserRank(count) {
    let rank = ``;
    if (count > 0 && count < 10) {
      rank = `novice`;
    } else if (count > 10 && count < 20) {
      rank = `fan`;
    } else if (count > 20) {
      rank = `movie buff`;
    }

    return rank;
  }
}

export default UserRating;
