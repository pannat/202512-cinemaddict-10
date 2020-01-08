import AbstractSmartComponent from "./abstract-smart-component";

class ControlsComponent extends AbstractSmartComponent {
  constructor(isAddedWatchlist, isAlreadyWatched, isFavorite) {
    super();
    this._isAddedWatchlist = isAddedWatchlist;
    this._isAlreadyWatched = isAlreadyWatched;
    this._isFavorite = isFavorite;

    this._dataChangeHandler = null;
    this._controlsClickHandler = this._controlsClickHandler.bind(this);
    this.recoveryListeners();
  }

  set dataChangeHandler(handler) {
    this._dataChangeHandler = handler;
  }

  rerender({isAddedWatchlist, isAlreadyWatched, isFavorite}) {
    this._isAddedWatchlist = isAddedWatchlist;
    this._isAlreadyWatched = isAlreadyWatched;
    this._isFavorite = isFavorite;
    super.rerender();
  }

  recoveryListeners() {
    this.element.addEventListener(`click`, this._controlsClickHandler);
  }
}

export default ControlsComponent;
