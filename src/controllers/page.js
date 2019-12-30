import {SortType} from "../utils";
import {render, RenderPosition} from "../utils/render";
import SortComponent from "../components/sort";
import MovieSectionComponent from "../components/movie-section";
import MovieMainContainerComponent from "../components/movie-main-container";
import ButtonShowMoreComponent from "../components/button-show-more";
import MessageNotMovies from "../components/message-not-movies";
import MovieController from "./movie"

const ShowingMovies = {
  COUNT_ON_START: 5,
  COUNT_BY_BUTTON: 5
};

class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._topRatedData = {};
    this._mostCommentedData = {};
    this._messageNotMovies = new MessageNotMovies();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._sortComponent = new SortComponent();
    this._movieMainContainerComponent = new MovieMainContainerComponent();
    this._showingMoviesCount = ShowingMovies.COUNT_ON_START;
    this._sectionAllMovies = new MovieSectionComponent(`All movies. Upcoming`, false);
    this._containerSectionAllMovies = this._sectionAllMovies.element.querySelector(`.films-list__container`);

    this._dataChangeHandler = this._dataChangeHandler.bind(this);
  }

  render() {
    if (this._data.length) {
      this._sortComponent.setClickHandler(this._sortClickHandler.bind(this));
      render(this._container, this._sortComponent.element, RenderPosition.BEFOREEND);
      this._renderCardsForSectionAllMovies(this._data);
      render(this._movieMainContainerComponent.element, this._sectionAllMovies.element, RenderPosition.AFTERBEGIN);

      if (this._data.some((movie) => movie.rating > 1)) {
        this._topRatedData = {
          title: `Top rated`,
          hasModifier: true,
          movie: this._data.slice(0).sort((a, b) => b.rating - a.rating)[0]
        };

        const sectionTopRated = new MovieSectionComponent(this._topRatedData.title, this._topRatedData.hasModifier);
        const containerSectionTopRated = sectionTopRated.element.querySelector(`.films-list__container`);
        this._renderMovieCard(containerSectionTopRated, this._topRatedData.movie);
        render(this._movieMainContainerComponent.element, sectionTopRated.element, RenderPosition.BEFOREEND);
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
        render(this._movieMainContainerComponent.element, sectionMostCommented.element, RenderPosition.BEFOREEND);
      }
    } else {
      this._movieMainContainerComponent.element.innerHTML = ``;
      render(this._container, this._messageNotMovies.element, RenderPosition.BEFOREEND);
    }
    render(this._container, this._movieMainContainerComponent.element, RenderPosition.BEFOREEND);
  }

  _renderCardsForSectionAllMovies(data) {
    data.slice(0, ShowingMovies.COUNT_ON_START).forEach((movie) => {
      this._renderMovieCard(this._containerSectionAllMovies, movie);
    });

    if (data.length > ShowingMovies.COUNT_BY_BUTTON) {

      const onClickButtonShowMore = () => {
        const prevMoviesCount = this._showingMoviesCount;
        this._showingMoviesCount += ShowingMovies.COUNT_BY_BUTTON;
        data.slice(prevMoviesCount, this._showingMoviesCount).forEach((movie) => {
          this._renderMovieCard(this._containerSectionAllMovies, movie);
        });

        if (this._showingMoviesCount >= data.length) {
          this._buttonShowMoreComponent.element.remove();
          this._buttonShowMoreComponent.removeElement();
        }
      };

      this._buttonShowMoreComponent.setClickHandler(onClickButtonShowMore);
      render(this._sectionAllMovies.element, this._buttonShowMoreComponent.element, RenderPosition.BEFOREEND);
    }
  }

  _renderMovieCard(container, data) {
    const movieController = new MovieController(container, this._dataChangeHandler);
    movieController.render(data);
  }

  _sortClickHandler(sortType) {
    this._containerSectionAllMovies.innerHTML = ``;
    this._showingMoviesCount = ShowingMovies.COUNT_ON_START;
    let sortedData = [];
    switch (sortType) {
      case SortType.DEFAULT:
        sortedData = this._data.slice(0);
        break;
      case SortType.DATE:
        sortedData = this._data.slice(0).sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedData = this._data.slice(0).sort((a, b) => b.rating - a.rating);
        break;
    }
    this._renderCardsForSectionAllMovies(sortedData);
  }

  _dataChangeHandler(movieController, oldData, newData) {
    const index = this._data.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._data = [].concat(this._data.slice(0, index), newData, this._data.slice(index + 1));

    movieController.render(this._data[index]);
  }
}

export default PageController;
