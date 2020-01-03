import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import {Key, ControlType} from "../utils";
import {render, replace, RenderPosition} from "../utils/render";

class MovieController {
  constructor(container, dataChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._cardComponent = null;
    this._fullCardComponent = null;
  }

  render(data) {
    const oldCardComponent = this._cardComponent;
    const oldFullCardComponent = this._fullCardComponent;

    this._fullCardComponent = new FullCardComponent(data);
    this._cardComponent = new CardComponent(data);
    const keydownPressHandler = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        closeFullCard();
      }
    };

    const closeFullCard = () => {
      window.removeEventListener(`keydown`, keydownPressHandler);
      this._fullCardComponent.reset();
      this._fullCardComponent.element.remove();
    };

    const controlsClickHandler = (controlType) => {
      let control = {};
      switch (controlType) {
        case ControlType.WATCHLIST:
          control.isAddedWatchlist = !data.isAddedWatchlist;
          break;
        case ControlType.ALREADY_WATCHED:
          control.isAlreadyWatched = !data.isAlreadyWatched;
          break;
        case ControlType.FAVORITE:
          control.isFavorite = !data.isFavorite;
          break;
      }

      window.removeEventListener(`keydown`, keydownPressHandler);
      const newData = Object.assign(data, control);
      this._dataChangeHandler(this, data, newData);
    };

    this._cardComponent.descriptionClickHandler = () => {
      window.addEventListener(`keydown`, keydownPressHandler);

      render(document.body, this._fullCardComponent.element, RenderPosition.BEFOREEND);
    };

    this._cardComponent.controlsClickHandler = controlsClickHandler;
    this._fullCardComponent.controlsClickHandler = controlsClickHandler;
    this._fullCardComponent.closeClickHandler = closeFullCard;

    this._fullCardComponent.recoveryListeners();
    this._cardComponent.recoveryListeners();

    if (oldCardComponent && oldFullCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._fullCardComponent, oldFullCardComponent);
    } else {
      render(this._container, this._cardComponent.element, RenderPosition.BEFOREEND);
    }
  }
}

export default MovieController;
