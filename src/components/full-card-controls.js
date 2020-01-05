import AbstractSmartComponent from "./abstract-smart-component";
import {ControlType} from "../utils";

class FullCardControls extends AbstractSmartComponent {
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
    return `<section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="${ControlType.WATCHLIST}" name="${ControlType.WATCHLIST}" ${this._isAddedWatchlist ? `checked` : `` }>
        <label for="${ControlType.WATCHLIST}" class="film-details__control-label film-details__control-label--${ControlType.WATCHLIST}">Add to ${ControlType.WATCHLIST}</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="${ControlType.ALREADY_WATCHED}" name="${ControlType.ALREADY_WATCHED}" ${this._isAlreadyWatched ? `checked` : `` }>
        <label for="${ControlType.ALREADY_WATCHED}" class="film-details__control-label film-details__control-label--${ControlType.ALREADY_WATCHED}">Already ${ControlType.ALREADY_WATCHED}</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="${ControlType.FAVORITE}" name="${ControlType.FAVORITE}" ${this._isFavorite ? `checked` : `` }>
        <label for="${ControlType.FAVORITE}" class="film-details__control-label film-details__control-label--${ControlType.FAVORITE}">Add to ${ControlType.FAVORITE}s</label>
      </section>`;
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
    this.element.querySelector(`#${ControlType.WATCHLIST}]`).addEventListener(`click`, this._addWatchlistClickHandler);
    this.element.querySelector(`#${ControlType.ALREADY_WATCHED}]`).addEventListener(`click`, this._alreadyWatchedClickHandler);
    this.element.querySelector(`#${ControlType.FAVORITE}]`).addEventListener(`click`, this._favoriteClickHandler);
  }
}

export default FullCardControls;
