import {capitalizeFirstLetter, ControlType} from "../utils";
import AbstractSmartComponent from "./abstract-smart-component";

class Card extends AbstractSmartComponent {
  constructor({title, poster, rating, releaseDate, runtime, genres, description, isFavorite, isAddedWatchlist, isAlreadyWatched, comments}) {
    super();
    this._title = title;
    this._poster = poster;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._genres = genres;
    this._description = description.length > 140 ? `${description.slice(0, 140)}...` : description;
    this._comments = comments;
    this._isFavorite = isFavorite;
    this._isAddedWatchlist = isAddedWatchlist;
    this._isAlreadyWatched = isAlreadyWatched;

    this._descriptionClickHandler = null;
    this._controlsClickHandler = null;
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
            <button data-control-type="${ControlType.WATCHLIST}" class="film-card__controls-item button film-card__controls-item--add-to-${ControlType.WATCHLIST} ${this._isAddedWatchlist ? `film-card__controls-item--active` : `` }">Add to watchlist</button>
            <button data-control-type="${ControlType.ALREADY_WATCHED}" class="film-card__controls-item button film-card__controls-item--mark-as-${ControlType.ALREADY_WATCHED} ${this._isAlreadyWatched ? `film-card__controls-item--active` : `` }">Already watched</button>
            <button data-control-type="${ControlType.FAVORITE}" class="film-card__controls-item button film-card__controls-item--${ControlType.FAVORITE} ${this._isFavorite ? `film-card__controls-item--active` : `` }">Add to favorites</button>
          </form>
        </article>`;
  }

  set descriptionClickHandler(handler) {
    this._descriptionClickHandler = handler;
  }

  set controlsClickHandler(handler) {
    this._controlsClickHandler = handler;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    this.element.querySelector(`.film-card__poster`).addEventListener(`click`, this._descriptionClickHandler);
    this.element.querySelector(`.film-card__title`).addEventListener(`click`, this._descriptionClickHandler);
    this.element.querySelector(`.film-card__comments`).addEventListener(`click`, this._descriptionClickHandler);

    this.element.querySelector(`.film-card__controls`).addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `BUTTON`) {
        return;
      }

      if (evt.target.classList.contains(`.film-card__controls-item--active`)) {
        return;
      }

      this._controlsClickHandler(evt.target.dataset.controlType);
    });
  }
}

export default Card;
