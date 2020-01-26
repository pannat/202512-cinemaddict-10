import AbstractComponent from "./abstract-component";
import {calculateUserRank} from "../utils/common";

class UserProfileComponent extends AbstractComponent {
  constructor(count) {
    super();
    this._userRank = calculateUserRank(count);
  }

  get template() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }


}

export default UserProfileComponent;
