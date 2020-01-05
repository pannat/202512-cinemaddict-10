import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import CardDetails from "../components/card-details";
import {Key, ControlType} from "../utils";
import {render, replace, RenderPosition} from "../utils/render";

const Mode = {
  DEFAULT: `default`,
  OPEN_POPUP: `open popup`,
};

class MovieController {
  constructor(container, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._mode = Mode.DEFAULT;
    this._closeFullCard = null;

    this._cardComponent = null;
    this._fullCardComponent = null;
    this._cardDetailsComponent = null;
  }

  render(data) {
    const oldCardComponent = this._cardComponent;
    const oldFullCardComponent = this._fullCardComponent;

    this._fullCardComponent = new FullCardComponent(data);
    this._cardComponent = new CardComponent(data);
    const keydownPressHandler = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        this._closeFullCard();
      }
    };

    this._closeFullCard = () => {
      window.removeEventListener(`keydown`, keydownPressHandler);
      this._fullCardComponent.reset();
      this._fullCardComponent.element.remove();
      this._mode = Mode.DEFAULT;
    };

    const controlsClickHandler = (controlType) => {
      let control = {};
      switch (controlType) {
        case ControlType.WATCHLIST:
          control.isAddedWatchlist = !data.isAddedWatchlist;
          break;
        case ControlType.ALREADY_WATCHED:
          control.isAlreadyWatched = !data.isAlreadyWatched;
          this._cardDetailsComponent = new CardDetails(data);
          if (control.isAlreadyWatched) {
            render(this._fullCardComponent.element.querySelector(`.form-details__middle-container`), this._cardDetailsComponent.element, RenderPosition.BEFOREEND);
          } else {
            this._cardDetailsComponent.element.remove();
            this._cardDetailsComponent.removeElement();
          }
          break;
        case ControlType.FAVORITE:
          control.isFavorite = !data.isFavorite;
          break;
      }

      window.removeEventListener(`keydown`, keydownPressHandler);
      const newData = Object.assign(data, control);
      this._dataChangeHandler(this, data, newData);
    };

    this._cardComponent.controlsClickHandler = controlsClickHandler;
    this._fullCardComponent.controlsClickHandler = controlsClickHandler;
    this._fullCardComponent.closeClickHandler = this._closeFullCard;

    this._cardComponent.descriptionClickHandler = () => {
      this._viewChangeHandler();

      render(document.body, this._fullCardComponent.element, RenderPosition.BEFOREEND);
      window.addEventListener(`keydown`, keydownPressHandler);
      this._mode = Mode.OPEN_POPUP;
    };

    this._fullCardComponent.recoveryListeners();
    this._cardComponent.recoveryListeners();

    if (oldCardComponent && oldFullCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._fullCardComponent, oldFullCardComponent);
    } else {
      render(this._container, this._cardComponent.element, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.OPEN_POPUP) {
      this._closeFullCard();
      this._mode = Mode.DEFAULT;
    }
  }
}

export default MovieController;
