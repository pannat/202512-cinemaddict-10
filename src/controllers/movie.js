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


    this._cardComponent = new CardComponent(data);
    this._fullCardComponent = new FullCardComponent(data);

    const closeFullCard = () => {
      this._fullCardComponent.element.remove();
    };

    const keydownPressHandler = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        closeFullCard();
      }
      window.removeEventListener(`keydown`, keydownPressHandler);
    };

    const openFullCard = () => {
      this._fullCardComponent.setCloseClickHandler(closeFullCard);
      window.addEventListener(`keydown`, keydownPressHandler);

      render(document.body, this._fullCardComponent.element, RenderPosition.BEFOREEND);
    };

    const cardControlsClickHandler = (controlType) => {
      let newProperty = {};
      switch (controlType) {
        case ControlType.WATCHLIST:
          newProperty.isAddedWatchlist = !data.isAddedWatchlist;
          break;
        case ControlType.ALREADY_WATCHED:
          newProperty.isAlreadyWatched = !data.isAlreadyWatched;
          break;
        case ControlType.FAVORITE:
          newProperty.isFavorite = !data.isFavorite;
          break;
      }
      const newData = Object.assign(data, newProperty);
      this._dataChangeHandler(this, data, newData);
    };

    this._cardComponent.setPosterClickHandler(openFullCard);
    this._cardComponent.setTitleClickHandler(openFullCard);
    this._cardComponent.setCommentsClickHandler(openFullCard);
    this._cardComponent.setControlsClickHandler(cardControlsClickHandler);

    if (oldCardComponent && oldFullCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._fullCardComponent, oldFullCardComponent);
    } else {
      render(this._container, this._cardComponent.element, RenderPosition.BEFOREEND);
    }
  }


}

export default MovieController;
