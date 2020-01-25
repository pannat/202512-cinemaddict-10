import {FilterType} from "../const";
import {getMoviesByFilter} from "../utils/filter";

class MoviesModel {
  constructor() {
    this._movies = [];

    this._activeFilterType = FilterType.ALL_MOVIES;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  get moviesByFilter() {
    return getMoviesByFilter(this._movies, this._activeFilterType);
  }

  get allMovies() {
    return this._movies;
  }

  set movies(movies) {
    this._movies = movies;
  }

  set filter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  set filterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  set dataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  updateMovie(id, newMovie) {
    const index = this._movies.findIndex((it) => it.id === id);
    if (index === -1) {
      return false;
    }

    this._movies = [].concat(this._movies.slice(0, index), newMovie, this._movies.slice(index + 1));

    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }

  addComment(idMovie, newComment) {
    const index = this._movies.findIndex((it) => it.id === idMovie);
    this._movies[index].comments.unshift(newComment);
    return true;
  }

  deleteComment(idMovie, idComment) {
    const index = this._movies.findIndex((it) => it.id === idMovie);
    const indexComment = this._movies[index].comments.findIndex((it) => it.id === idComment);
    this._movies[index].comments.splice(indexComment, 1);
    return true;
  }
}

export default MoviesModel;
