import {capitalizeFirstLetter} from "../utils";
import AbstractComponent from "./abstract-component";

class Card extends AbstractComponent {
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
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`;
  }

  setClickHandler(handler) {
    this._setClickPosterHandler(handler);
    this._setClickTitleHandler(handler);
    this._setClickCommentsHandler(handler);
  }

  _setClickPosterHandler(handler) {
    this.element.querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }

  _setClickTitleHandler(handler) {
    this.element.querySelector(`.film-card__title`).addEventListener(`click`, handler);
  }

  _setClickCommentsHandler(handler) {
    this.element.querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }
}

export default Card;
