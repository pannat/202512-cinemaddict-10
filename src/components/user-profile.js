import AbstractComponent from "./abstract-component";

class UserProfileComponent extends AbstractComponent {
  constructor(count) {
    super();
    this._userRank = this.calculateUserRank(count);
  }

  get template() {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this._userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
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

export default UserProfileComponent;
