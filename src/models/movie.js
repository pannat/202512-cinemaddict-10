class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data[`film_info`][`title`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.rating = data[`film_info`][`total_rating`];
    this.poster = data[`film_info`][`poster`];
    this.ageLimit = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.releaseDate = data[`film_info`][`release`][`date`];
    this.country = data[`film_info`][`release`][`release_country`];
    this.runtime = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.personalRating = data[`user_details`][`personal_rating`];
    this.isFavorite = Boolean(data[`user_details`][`favorite`]);
    this.isAddedWatchlist = Boolean(data[`user_details`][`watchlist`]);
    this.isAlreadyWatched = Boolean(data[`user_details`][`already_watched`]);
    this.watchingDate = data[`user_details`][`watching_date`] ? new Date(data[`user_details`][`watching_date`]) : null;
    this.comments = data[`comments`];
  }

  toRAW() {
    return {
      'id': this.id,
      'film_info': {
        'title': this.title,
        'alternative_title': this.alternativeTitle,
        'total_rating': this.rating,
        'poster': this.poster,
        'age_rating': this.ageLimit,
        'director': this.director,
        'writers': this.writers,
        'actors': this.actors
      },
      'release': {
        'date': this.releaseDate,
        'release_country': this.country
      },
      'runtime': this.runtime,
      'description': this.description,
      'user-details': {
        'watchlist': this.isAddedWatchlist,
        'favorite': this.isFavorite,
        'already_watched': this.isAlreadyWatched,
        'watching_date': this.watchingDate
      },
      'comments': this.comments
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}

export default Movie;
