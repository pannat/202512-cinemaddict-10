import AbstractSmartComponent from "./abstract-smart-component";
import {ControlType} from "../utils";

class CardControls extends AbstractSmartComponent {
  constructor(isAddedWatchlist, isAlreadyWatched, isFavorite) {
    super();
    this._isAddedWatchlist = isAddedWatchlist;
    this._isAlreadyWatched = isAlreadyWatched;
    this._isFavorite = isFavorite;

    this._addWatchlistClickHandler = null;
    this._alreadyWatchedClickHandler = null;
    this._favoriteClickHandler = null;
  }

  get template() {
    return `<form class="film-card__controls">
            <button data-control-type="${ControlType.WATCHLIST}" class="film-card__controls-item button film-card__controls-item--add-to-${ControlType.WATCHLIST} ${this._isAddedWatchlist ? `film-card__controls-item--active` : `` }">Add to watchlist</button>
            <button data-control-type="${ControlType.ALREADY_WATCHED}" class="film-card__controls-item button film-card__controls-item--mark-as-${ControlType.ALREADY_WATCHED} ${this._isAlreadyWatched ? `film-card__controls-item--active` : `` }">Already watched</button>
            <button data-control-type="${ControlType.FAVORITE}" class="film-card__controls-item button film-card__controls-item--${ControlType.FAVORITE} ${this._isFavorite ? `film-card__controls-item--active` : `` }">Add to favorites</button>
          </form>`;
  }

  set addWatchlistClickHandler(handler) {
    this._addWatchlistClickHandler = handler;
  }

  set alreadyWatchedClickHandler(handler) {
    this._alreadyWatchedClickHandler = handler;
  }

  set favoriteClickHandler(handler) {
    this._favoriteClickHandler = handler;
  }

  recoveryListeners() {
    this.element.querySelector(`[data-control-type=${ControlType.WATCHLIST}]`).addEventListener(`click`, this._addWatchlistClickHandler);
    this.element.querySelector(`[data-control-type=${ControlType.ALREADY_WATCHED}]`).addEventListener(`click`, this._alreadyWatchedClickHandler);
    this.element.querySelector(`[data-control-type=${ControlType.FAVORITE}]`).addEventListener(`click`, this._favoriteClickHandler);
  }
}

export default CardControls;
