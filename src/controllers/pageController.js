import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import {Key, render, RenderPosition} from "../utils";
import MovieSectionComponent from "../components/movie-section";
import ButtonShowMoreComponent from "../components/button-show-more";
import MessageNotMovies from "../components/message-not-movies";

const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._sectionData = [];
  }

  render() {
    if (this._data.length) {
      this._sectionData = [
        {
          title: `All movies. Upcoming`,
          hasModifier: false,
          movies: this._data.slice(0, SHOWING_MOVIES_COUNT_ON_START)
        },
        {
          title: `Top rated`,
          hasModifier: true,
          movies: this._data.slice(0).sort((a, b) => b.rating - a.rating)[0]
        },
        {
          title: `Most commented`,
          hasModifier: true,
          movies: this._data.slice(0).sort((a, b) => b.comments.length - a.comments.length)[0]
        }
      ];
    } else {
      this._container.innerHTML = ``;
      render(this._container, new MessageNotMovies().element, RenderPosition.BEFOREEND);
    }
  }

  renderSections(title, hasModifier, movies) {

  }

  _renderMovieCard(container, movies) {
    const cardComponent = new CardComponent(movies);
    const fullCardComponent = new FullCardComponent(movies);

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
      fullCardComponent.setClickCloseHandler(closeFullCard);
      window.addEventListener(`keydown`, onKeydownPress);

      render(this._container, fullCardComponent.element, RenderPosition.BEFOREEND);
    };

    cardComponent.setClickHandler(openFullCard);

    render(this._container, cardComponent.element, RenderPosition.BEFOREEND);
  }
}


