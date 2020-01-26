import AbstractSmartComponent from "./abstract-smart-component";
import {capitalizeFirstLetter} from "../utils/common";
import {formatRuntime} from "../utils/common";
import moment from "moment";
import {Key} from "../const";

class FullCardComponent extends AbstractSmartComponent {
  constructor({title, poster, director, writers, actors, releaseDate, runtime, country, genres, rating, description, ageLimit}) {
    super();
    this._title = title;
    this._poster = poster;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
    this._runtime = formatRuntime(runtime);
    this._country = country;
    this._genres = genres;
    this._rating = rating;
    this._description = description;
    this._ageLimit = ageLimit;

    this._closeClickHandler = null;
    this._formSubmitHandler = null;
  }

  get template() {
    return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="">

          <p class="film-details__age">${this._ageLimit}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${this._title}</h3>
              <p class="film-details__title-original">Original: ${this._title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${this._rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${this._director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${this._writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${this._actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${this._releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${this._runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${this._country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${this._genres.length > 1 ? `Genres` : `Genre`}</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${this._genres.map((genre, index) => `${index === 0 ? capitalizeFirstLetter(genre) : `${genre}` }`).join(`, `)}</span>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${this._description}
          </p>
        </div>
      </div>
    </div>
    <div class="form-details__middle-container"></div>
    <div class="form-details__bottom-container">
    </div>
  </form>
</section>`;
  }

  set formSubmitHandler(handler) {
    this._formSubmitHandler = (evt) => {
      if (evt.key !== Key.ENTER || !evt.ctrlKey) {
        return;
      }

      handler();
    };
  }

  set closeClickHandler(handler) {
    this._closeClickHandler = handler;
  }

  get ratingElement() {
    return this.element.querySelector(`.film-details__rating`);
  }

  get middleContainerElement() {
    return this.element.querySelector(`.form-details__middle-container`);
  }

  get commentContainerElement() {
    return this.element.querySelector(`.form-details__bottom-container`);
  }

  recoveryListeners() {
    this.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);
    this.element.querySelector(`form`).addEventListener(`keyup`, this._formSubmitHandler);
  }
}

export default FullCardComponent;
