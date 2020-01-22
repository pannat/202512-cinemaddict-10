import {capitalizeFirstLetter} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

class CardComponent extends AbstractSmartComponent {
  constructor({title, poster, rating, releaseDate, runtime, genres, description, comments}) {
    super();
    this._title = title;
    this._poster = poster;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._genres = genres;
    this._description = description.length > 140 ? `${description.slice(0, 140)}...` : description;
    this._comments = comments;

    this._descriptionClickHandler = null;
  }

  get template() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${new Date(this._releaseDate).getFullYear()}</span>
            <span class="film-card__duration">${this._runtime}</span>
            <span class="film-card__genre">${capitalizeFirstLetter(this._genres[0])}</span>
          </p>
          <img src="./images/posters/${this._poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <a class="film-card__comments">${this._comments.length} comments</a>
        </article>`;
  }

  set descriptionClickHandler(handler) {
    this._descriptionClickHandler = handler;
  }

  recoveryListeners() {
    this.element.querySelector(`.film-card__poster`).addEventListener(`click`, this._descriptionClickHandler);
    this.element.querySelector(`.film-card__title`).addEventListener(`click`, this._descriptionClickHandler);
    this.element.querySelector(`.film-card__comments`).addEventListener(`click`, this._descriptionClickHandler);
  }
}

export default CardComponent;
