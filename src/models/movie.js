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
    this.releaseDate = data[`release`][`date`];
    this.country = data[`release`][`release_country`];
    this.runtime = data[`runtime`];
    this.description = data[`description`];
    this.personalRating = data[`user-details`][`personal_rating`];
    this.isFavorite = data[`user-details`][`favorite`];
    this.isAddedWatchlist = data[`user-details`][`watchlist`];
    this.isAlreadyWatched = data[`user-details`][`already_watched`];
    this.watchingDate = data[`user-details`][`watching_date`];
    this.comments = data[`user-details`][`comments`];
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
