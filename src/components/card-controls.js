import {ControlType} from "../const";
import Controls from "./controls";

class CardControlsComponent extends Controls {
  constructor({isAddedWatchlist, isAlreadyWatched, isFavorite}) {
    super(isAddedWatchlist, isAlreadyWatched, isFavorite);
  }

  get template() {
    return `<form class="film-card__controls">
            <button data-control-type="${ControlType.WATCHLIST}" class="film-card__controls-item button film-card__controls-item--add-to-${ControlType.WATCHLIST} ${this._isAddedWatchlist ? `film-card__controls-item--active` : `` }">Add to watchlist</button>
            <button data-control-type="${ControlType.ALREADY_WATCHED}" class="film-card__controls-item button film-card__controls-item--mark-as-${ControlType.ALREADY_WATCHED} ${this._isAlreadyWatched ? `film-card__controls-item--active` : `` }">Already watched</button>
            <button data-control-type="${ControlType.FAVORITE}" class="film-card__controls-item button film-card__controls-item--${ControlType.FAVORITE} ${this._isFavorite ? `film-card__controls-item--active` : `` }">Add to favorites</button>
          </form>`;
  }

  _controlsClickHandler(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `BUTTON`) {
      return;
    }

    switch (evt.target.dataset.controlType) {
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

export default CardControlsComponent;
