import ControlsComponent from "./controls";
import {ControlType} from "../utils";

class FullCardControls extends ControlsComponent {
  constructor(isAddedWatchlist, isAlreadyWatched, isFavorite) {
    super(isAddedWatchlist, isAlreadyWatched, isFavorite);
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

  _controlsClickHandler(evt) {

    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    switch (evt.target.name) {
      case ControlType.WATCHLIST:
        this._isAddedWatchlist = !this._isAddedWatchlist;
        break;
      case ControlType.ALREADY_WATCHED:
        this._isAlreadyWatched = !this._isAlreadyWatched;
        break;
      case ControlType.FAVORITE:
        this._isFavorite = !this._isFavorite;
        break;
    }

    this._dataChangeHandler({
      isAddedWatchlist: this._isAddedWatchlist,
      isAlreadyWatched: this._isAlreadyWatched,
      isFavorite: this._isFavorite
    });
  }
}

export default FullCardControls;
