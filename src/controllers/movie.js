import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import {Key, render, RenderPosition, SortType, ControlType} from "../utils";

class MovieController {
  constructor(container, dataChangeHandler) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
  }

  render(data) {
    const cardComponent = new CardComponent(data);
    const fullCardComponent = new FullCardComponent(data);

    const closeFullCard = () => {
      fullCardComponent.element.remove();
    };

    const keydownPressHandler = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        closeFullCard();
      }
      window.removeEventListener(`keydown`, keydownPressHandler);
    };

    const openFullCard = () => {
      fullCardComponent.setCloseClickHandler(closeFullCard);
      window.addEventListener(`keydown`, keydownPressHandler);

      render(document.body, fullCardComponent.element, RenderPosition.BEFOREEND);
    };

    const cardControlsClickHandler = (controlType) => {
      let newProperty = {};
      switch (controlType) {
        case ControlType.WATCHLIST:
          newProperty.isAddedWatchlist = true;
          break;
        case ControlType.ALREADY_WATCHED:
          newProperty.isAlreadyWatched = true;
          break;
        case ControlType.FAVORITE:
          newProperty.isFavorite = true;
          break;
      }
      const newData = Object.assign(data, newProperty);
      this._dataChangeHandler(this, data, newData);
    }

    cardComponent.setPosterClickHandler(openFullCard);
    cardComponent.setTitleClickHandler(openFullCard);
    cardComponent.setCommentsClickHandler(openFullCard);
    cardComponent.setControlsClickHandler(cardControlsClickHandler);

    render(this._container, cardComponent.element, RenderPosition.BEFOREEND);
  }


}

export default MovieController;
