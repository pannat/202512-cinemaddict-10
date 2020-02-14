import {Method} from "./const";
import Movie from "./models/movie";
import { ResolvePlugin } from "webpack";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((movies) => {
        const totalComments = movies.map((movie) => this.getComments(movie.id));
        return new Promise((resolve) => {
          Promise.all(totalComments)
          .then((response) => {
            movies.forEach((movie, i) => {
              movie.comments = response[i];
            });
            resolve(movies);
          });
        });
      })
      .then(Movie.parseMovies);
  }

  getComments(id) {
    return this._load({url: `comments/${id}`})
        .then((response) => response.json());
  }

  // createTask(task) {
  // }
  //
  // updateTask(id, data) {
  // }
  //
  // deleteTask(id) {
  // }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
};

export default API;
