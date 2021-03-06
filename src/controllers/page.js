import {SortType, ShowingMovies, ExtraSection} from "../const";
import {render, remove, RenderPosition} from "../utils/render";
import SortComponent from "../components/sort";
import MovieSectionComponent from "../components/movie-section";
import MovieMainContainerComponent from "../components/movie-main-container";
import ButtonShowMoreComponent from "../components/button-show-more";
import MessageNotMovies from "../components/message-not-movies";
import MovieController from "./movie";

class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._messageNotMovies = new MessageNotMovies();
    this._buttonShowMoreComponent = new ButtonShowMoreComponent();
    this._sortComponent = new SortComponent();
    this._movieMainContainerComponent = new MovieMainContainerComponent();
    this._showingMoviesCount = ShowingMovies.COUNT_ON_START;
    this._sectionAllMovies = new MovieSectionComponent(`All movies. Upcoming`, false);
    this._containerSectionAllMovies = this._sectionAllMovies.element.querySelector(`.films-list__container`);

    this._showedMovieControllers = [];
    this._extraMovies = [];
    this._dataChangeHandler = this._dataChangeHandler.bind(this);
    this._commentsChangeHandler = this._commentsChangeHandler.bind(this);
    this._viewChangeHandler = this._viewChangeHandler.bind(this);

    this._moviesModel.filterChangeHandler = this._filterChangeHandler.bind(this);
  }

  render() {
    const movies = this._moviesModel.moviesByFilter;
    if (movies.length) {
      this._sortComponent.buttonClickHandler = this._sortClickHandler.bind(this);
      this._sortComponent.recoveryListeners();
      render(this._container, this._sortComponent.element, RenderPosition.BEFOREEND);
      this._renderCardsForSectionAllMovies(movies);
      render(this._movieMainContainerComponent.element, this._sectionAllMovies.element, RenderPosition.AFTERBEGIN);

      if (movies.some((movie) => movie.rating > 1)) {
        const topRatedMovie = movies.slice(0).sort((a, b) => b.rating - a.rating)[0];
        const index = movies.findIndex((it) => it === topRatedMovie);
        movies[index].isExtra = true;

        const sectionTopRated = new MovieSectionComponent(ExtraSection.TOP_RATED.TITLE, ExtraSection.TOP_RATED.HAS_MODIFIER);
        const containerSectionTopRated = sectionTopRated.element.querySelector(`.films-list__container`);

        this._renderCard(containerSectionTopRated, movies[index]);
        render(this._movieMainContainerComponent.element, sectionTopRated.element, RenderPosition.BEFOREEND);
      }

      if (movies.some((movie) => movie.comments.length)) {
        const mostCommented = movies.slice(0).sort((a, b) => b.comments.length - a.comments.length)[0];
        const index = movies.findIndex((it) => it === mostCommented);
        movies[index].isExtra = true;

        const sectionMostCommented = new MovieSectionComponent(ExtraSection.MOST_COMMENTED.TITLE, ExtraSection.MOST_COMMENTED.HAS_MODIFIER);
        const containerMostCommented = sectionMostCommented.element.querySelector(`.films-list__container`);

        this._renderCard(containerMostCommented, movies[index]);
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
          remove(this._buttonShowMoreComponent);
        }
      };

      this._buttonShowMoreComponent.setClickHandler(onClickButtonShowMore);
      render(this._sectionAllMovies.element, this._buttonShowMoreComponent.element, RenderPosition.BEFOREEND);
    }
  }

  _renderCard(container, movie) {
    const movieController = new MovieController(container, movie, this._dataChangeHandler, this._viewChangeHandler, this._commentsChangeHandler);
    movieController.render();
    this._showedMovieControllers.push(movieController);
    if (movie.isExtra) {
      this._extraMovies.push(movieController);
    }
  }

  _removeMovies() {
    this._containerSectionAllMovies.innerHTML = ``;
    this._showedMovieControllers = this._extraMovies.length ? [].concat(this._extraMovies) : [];
    remove(this._buttonShowMoreComponent);
  }

  _sortClickHandler(sortType) {
    const movies = this._moviesModel.moviesByFilter;
    let sortedData = [];
    switch (sortType) {
      case SortType.DEFAULT:
        sortedData = movies.slice(0);
        break;
      case SortType.DATE:
        sortedData = movies.slice(0).sort((a, b) => b.releaseDate - a.releaseDate);
        break;
      case SortType.RATING:
        sortedData = movies.slice(0).sort((a, b) => b.rating - a.rating);
        break;
    }

    this._removeMovies();
    this._renderCardsForSectionAllMovies(sortedData);
  }

  _dataChangeHandler(id, newData) {
    const isSuccess = this._moviesModel.updateMovie(id, newData);

    if (isSuccess) {
      const showedMovieControllersHasCurrentId = this._showedMovieControllers.filter((it) => it.id === id);
      showedMovieControllersHasCurrentId.forEach((it) => it.rerender(newData));
    }
  }

  _commentsChangeHandler(idMovie, idComment, newData = null) {
    if (newData) {
      const isSuccess = this._moviesModel.addComment(idMovie, newData);

      if (isSuccess) {
        const showedMovieControllersHasCurrentId = this._showedMovieControllers.filter((it) => it.id === idMovie);
        showedMovieControllersHasCurrentId.forEach((it) => it.addNewComment(newData));
      }
    } else {
      const isSuccess = this._moviesModel.deleteComment(idMovie, idComment, newData);

      if (isSuccess) {
        const showedMovieControllersHasCurrentId = this._showedMovieControllers.filter((it) => it.id === idMovie);
        showedMovieControllersHasCurrentId.forEach((it) => it.deleteComment(idComment));
      }
    }
  }

  _viewChangeHandler() {
    this._showedMovieControllers.forEach((it) => it.setDefaultView());
  }

  _filterChangeHandler() {
    this._removeMovies();
    this._showedMovieControllers = this._extraMovies.length ? [].concat(this._extraMovies) : [];
    this._showingMoviesCount = ShowingMovies.COUNT_ON_START;
    this._sortClickHandler(this._sortComponent.currentSortType);
  }
}

export default PageController;
