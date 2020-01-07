import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import CardDetails from "../components/card-details";
import {Key} from "../utils";
import {render, replace, RenderPosition} from "../utils/render";
import CardControls from "../components/card-controls";
import FullCardControls from "../components/full-card-controls";

const Mode = {
  DEFAULT: `default`,
  OPEN_POPUP: `open popup`,
};

class MovieController {
  constructor(container, data, dataChangeHandler, viewChangeHandler) {
    this._container = container;
    this._data = data;
    this._id = data.id;
    this._mode = Mode.DEFAULT;
    this._cardComponent = null;
    this._fullCardComponent = null;
    this._cardDetailsComponent = null;
    this._cardControlsComponent = null;

    this._dataChangeHandler = dataChangeHandler;
    this._viewChangeHandler = viewChangeHandler;
    this._closeFullCard = this._closeFullCard.bind(this);
    this._keydownPressHandler = this._keydownPressHandler.bind(this);
    this._descriptionClickHandler = this._descriptionClickHandler.bind(this);
    this._controlsClickHandler = this._controlsClickHandler.bind(this);
  }

  get id() {
    return this._id;
  }

  render() {
    const oldCardComponent = this._cardComponent;
    const oldFullCardComponent = this._fullCardComponent;

    this._cardComponent = new CardComponent(this._data);
    this._cardComponent.descriptionClickHandler = this._descriptionClickHandler;
    this._cardControlsComponent = new CardControls(this._data);
    this._cardControlsComponent.dataChangeHandler = this._controlsClickHandler;
    render(this._cardComponent.element, this._cardControlsComponent.element, RenderPosition.BEFOREEND);

    this._fullCardComponent = new FullCardComponent(this._data);
    this._fullCardComponent.closeClickHandler = this._closeFullCard;
    this._fullCardControlsComponent = new FullCardControls(this._data);
    this._fullCardControlsComponent.dataChangeHandler = this._controlsClickHandler;
    render(this._fullCardComponent.element.querySelector(`.form-details__top-container`), this._fullCardControlsComponent.element, RenderPosition.BEFOREEND);

    this._fullCardComponent.recoveryListeners();
    this._cardComponent.recoveryListeners();

    if (oldCardComponent && oldFullCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._fullCardComponent, oldFullCardComponent);
    } else {
      render(this._container, this._cardComponent.element, RenderPosition.BEFOREEND);
    }
  }

  rerender(data) {
    this._data = data;
    this._cardControlsComponent.rerender(data);
    this._fullCardControlsComponent.rerender(data);
  }

  setDefaultView() {
    if (this._mode === Mode.OPEN_POPUP) {
      this._closeFullCard();
      this._mode = Mode.DEFAULT;
    }
  }

  _closeFullCard() {
    window.removeEventListener(`keydown`, this._keydownPressHandler);
    this._fullCardComponent.element.remove();
    this._mode = Mode.DEFAULT;
  }

  _keydownPressHandler(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
      this._closeFullCard();
    }
  }

  _controlsClickHandler(data) {
    const newData = Object.assign(this._data, data);
    if (this._data.isAlreadyWatched) {
      this._cardDetailsComponent = new CardDetails(this._data);
      render(this._fullCardComponent.middleContainerElement, this._cardDetailsComponent.element, RenderPosition.BEFOREEND);
    } else if (this._cardDetailsComponent) {
      this._cardDetailsComponent.element.remove();
      this._cardDetailsComponent.removeElement();
    }
    this._dataChangeHandler(this._id, this._data, newData);
  }

  _ratingChangeHandler(value) {
    this._userRatingComponent = new UserRatingComponent(value);
  }

  _descriptionClickHandler() {
    this._viewChangeHandler();

    render(document.body, this._fullCardComponent.element, RenderPosition.BEFOREEND);
    window.addEventListener(`keydown`, this._keydownPressHandler);
    this._mode = Mode.OPEN_POPUP;
  }
}

export default MovieController;
