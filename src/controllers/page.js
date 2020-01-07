import {SortType} from "../utils";
import {render, RenderPosition} from "../utils/render";
import SortComponent from "../components/sort";
import MovieSectionComponent from "../components/movie-section";
import MovieMainContainerComponent from "../components/movie-main-container";
import ButtonShowMoreComponent from "../components/button-show-more";
import MessageNotMovies from "../components/message-not-movies";
import MovieController from "./movie";

const ExtraSection = {
  MOST_COMMENTED: {
    TITLE: `Most commented`,
    HAS_MODIFIER: true
  },
  TOP_RATED: {
    TITLE: `Top rated`,
    HAS_MODIFIER: true
  },
};

const ShowingMovies = {
  COUNT_ON_START: 5,
  COUNT_BY_BUTTON: 5
};


class PageController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._messageNotMovies = new MessageNotMovies();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._sortComponent = new SortComponent();
    this._movieMainContainerComponent = new MovieMainContainerComponent();
    this._showingMoviesCount = ShowingMovies.COUNT_ON_START;
    this._sectionAllMovies = new MovieSectionComponent(`All movies. Upcoming`, false);
    this._containerSectionAllMovies = this._sectionAllMovies.element.querySelector(`.films-list__container`);

    this._showedMovieControllers = [];
    this._mostCommentedMovieController = null;
    this._topRatedMovieController = null;
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);
  }

  render() {
    if (this._data.length) {
      this._sortComponent.setClickHandler(this._sortClickHandler.bind(this));
      render(this._container, this._sortComponent.element, RenderPosition.BEFOREEND);
      this._renderCardsForSectionAllMovies(this._data);
      render(this._movieMainContainerComponent.element, this._sectionAllMovies.element, RenderPosition.AFTERBEGIN);

      if (this._data.some((movie) => movie.rating > 1)) {
        const topRatedMovie = this._data.slice(0).sort((a, b) => b.rating - a.rating)[0];
        const index = this._data.findIndex((it) => it === topRatedMovie);
        this._data[index].isTopRated = true;

        const sectionTopRated = new MovieSectionComponent(ExtraSection.TOP_RATED.TITLE, ExtraSection.TOP_RATED.HAS_MODIFIER);
        const containerSectionTopRated = sectionTopRated.element.querySelector(`.films-list__container`);

        this._renderCard(containerSectionTopRated, this._data[index]);
        render(this._movieMainContainerComponent.element, sectionTopRated.element, RenderPosition.BEFOREEND);
      }

      if (this._data.some((movie) => movie.comments.length)) {
        const mostCommented = this._data.slice(0).sort((a, b) => b.comments.length - a.comments.length)[0];
        const index = this._data.findIndex((it) => it === mostCommented);
        this._data[index].isMostCommented = true;

        const sectionMostCommented = new MovieSectionComponent(ExtraSection.MOST_COMMENTED.TITLE, ExtraSection.MOST_COMMENTED.HAS_MODIFIER);
        const containerMostCommented = sectionMostCommented.element.querySelector(`.films-list__container`);

        this._renderCard(containerMostCommented, this._data[index]);
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
      this._renderCard(this._containerSectionAllMovies, movie);
    });

    if (data.length > ShowingMovies.COUNT_BY_BUTTON) {

      const onClickButtonShowMore = () => {
        const prevMoviesCount = this._showingMoviesCount;
        this._showingMoviesCount += ShowingMovies.COUNT_BY_BUTTON;
        data.slice(prevMoviesCount, this._showingMoviesCount).forEach((movie) => {
          this._renderCard(this._containerSectionAllMovies, movie);
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

  _renderCard(container, movie) {
    const movieController = new MovieController(container, movie, this._dataChangeHandler, this._viewChangeHandler);
    movieController.render();
    this._showedMovieControllers.push(movieController);
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
    this._showedMovieControllers = [].concat(this._mostCommentedMovieController, this._topRatedMovieController);
    this._renderCardsForSectionAllMovies(sortedData);
  }

  _dataChangeHandler(idMovieController, oldData, newData) {
    const index = this._data.findIndex((it) => it === oldData);
    if (index === -1) {
      return;
    }

    this._data = [].concat(this._data.slice(0, index), newData, this._data.slice(index + 1));

    const showedMovieControllersHasCurrentId = this._showedMovieControllers.filter((it) => it.id === idMovieController);
    showedMovieControllersHasCurrentId.forEach((it) => it.rerender(this._data[index]));
  }

  _viewChangeHandler() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }
}

export default PageController;
