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
    this._allMoviesData = {};
    this._topRatedData = {};
    this._mostCommentedData = {};
    this._messageNotMovies = new MessageNotMovies();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;
  }

  render() {
    if (this._data.length) {
      this._allMoviesData = {
        title: `All movies. Upcoming`,
        hasModifier: false,
        movies: this._data.slice(0, SHOWING_MOVIES_COUNT_ON_START)
      };

      const sectionAllMovies = new MovieSectionComponent(this._allMoviesData.title, this._allMoviesData.hasModifier);
      const containerSectionAllMovies = sectionAllMovies.element.querySelector(`.films-list__container`);
      this._allMoviesData.movies.forEach((movie) => this._renderMovieCard(containerSectionAllMovies, movie));
      render(this._container, sectionAllMovies.element, RenderPosition.AFTERBEGIN);

      if (this._data.length > SHOWING_MOVIES_COUNT_BY_BUTTON) {

        const onClickButtonShowMore = () => {
          const prevMoviesCount = this._showingMoviesCount;
          this._showingMoviesCount += SHOWING_MOVIES_COUNT_BY_BUTTON;
          this._data.slice(prevMoviesCount, this._showingMoviesCount).forEach((movie) => this._renderMovieCard(containerSectionAllMovies, movie));

          if (this._showingMoviesCount >= this._data.length) {
            this._buttonShowMoreComponent.element.remove();
            this._buttonShowMoreComponent.removeElement();
          }
        };

        this._buttonShowMoreComponent.setClickHandler(onClickButtonShowMore);
        render(sectionAllMovies.element, this._buttonShowMoreComponent.element, RenderPosition.BEFOREEND);
      }

      if (this._data.some((movie) => movie.rating > 1)) {
        this._topRatedData = {
          title: `Top rated`,
          hasModifier: true,
          movie: this._data.slice(0).sort((a, b) => b.rating - a.rating)[0]
        };

        const sectionTopRated = new MovieSectionComponent(this._topRatedData.title, this._topRatedData.hasModifier);
        const containerSectionTopRated = sectionTopRated.element.querySelector(`.films-list__container`);
        this._renderMovieCard(containerSectionTopRated, this._topRatedData.movie);
        render(this._container, sectionTopRated.element, RenderPosition.BEFOREEND);
      }

      if (this._data.some((movie) => movie.comments.length)) {
        this._mostCommentedData = {
          title: `Most commented`,
          hasModifier: true,
          movie: this._data.slice(0).sort((a, b) => b.comments.length - a.comments.length)[0]
        };

        const sectionMostCommented = new MovieSectionComponent(this._mostCommentedData.title, this._mostCommentedData.hasModifier);
        const containerMostCommented = sectionMostCommented.element.querySelector(`.films-list__container`);
        this._renderMovieCard(containerMostCommented, this._mostCommentedData.movie);
        render(this._container, sectionMostCommented.element, RenderPosition.BEFOREEND);
      }
    } else {
      this._container.innerHTML = ``;
      render(this._container, this._messageNotMovies.element, RenderPosition.BEFOREEND);
    }
  }

  _renderMovieCard(container, movie) {
    const cardComponent = new CardComponent(movie);
    const fullCardComponent = new FullCardComponent(movie);

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

      render(container, fullCardComponent.element, RenderPosition.BEFOREEND);
    };

    cardComponent.setClickHandler(openFullCard);

    render(container, cardComponent.element, RenderPosition.BEFOREEND);
  }
}

export default PageController;
