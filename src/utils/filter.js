import {FilterType} from "../const";

const getWatchlistMovies = (movies) => {
  return movies.filter((it) => it.isAddedWatchlist);
};

const getHistoryMovies = (movies) => {
  return movies.filter((it) => it.isAlreadyWatched);
};

const getFavoriteMovies = (movies) => {
  return movies.filter((it) => it.isFavorite);
};

const getMoviesByFilter = (movies, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchlistMovies(movies);
    case FilterType.HISTORY:
      return getHistoryMovies(movies);
    case FilterType.FAVORITES:
      return getFavoriteMovies(movies);
  }

  return movies;
};

export {getWatchlistMovies, getHistoryMovies, getFavoriteMovies, getMoviesByFilter};
