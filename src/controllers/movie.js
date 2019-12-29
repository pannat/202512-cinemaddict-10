import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import {Key, render, RenderPosition} from "../utils";

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

    const onKeydownPress = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
        closeFullCard();
      }
      window.removeEventListener(`keydown`, onKeydownPress);
    };

    const openFullCard = () => {
      fullCardComponent.setCloseClickHandler(closeFullCard);
      window.addEventListener(`keydown`, onKeydownPress);

      render(document.body, fullCardComponent.element, RenderPosition.BEFOREEND);
    };

    cardComponent.setPosterClickHandler(openFullCard);
    cardComponent.setTitleClickHandler(openFullCard);
    cardComponent.setCommentsClickHandler(openFullCard);

    render(this._container, cardComponent.element, RenderPosition.BEFOREEND);
  }
}

export default MovieController;
