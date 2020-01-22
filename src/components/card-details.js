import AbstractSmartComponent from "./abstract-smart-component";
import {RATING_POINTS} from "../const";

class CardDetailsComponent extends AbstractSmartComponent {
  constructor({title, poster, personalRating}) {
    super();
    this._title = title;
    this._poster = poster;
    this._currentScore = personalRating;
    this._ratingChangeHandler = null;
    this._resetClickHandler = null;

    this._ratingResetClickHandler = this._ratingResetClickHandler.bind(this);
    this.recoveryListeners();
  }

  get template() {
    return `<section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>
    <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="./images/posters/${this._poster}" alt="film-poster" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${this._title}</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                  ${RATING_POINTS.map((it) => {
    return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${it}" id="rating-${it}-${this._title}"
${this._currentScore && this._currentScore === it ? `checked` : ``}>
      <label class="film-details__user-rating-label" for="rating-${it}-${this._title}">${it}</label>`;
  }).join(``)}
              </div>
          </section>
      </div>
    </section>`;
  }

  set ratingChangeHandler(handler) {
    this._ratingChangeHandler = handler;
  }

  set resetClickHandler(handler) {
    this._resetClickHandler = handler;
  }

  get currentScore() {
    return this._currentScore;
  }

  recoveryListeners() {
    this.element.querySelector(`.film-details__user-rating-score`).addEventListener(`change`, (evt) => {
      this._ratingChangeHandler(evt.target.value);
      this._currentScore = evt.target.value;
    });

    this.element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, this._ratingResetClickHandler);
  }

  _ratingResetClickHandler(evt) {
    evt.preventDefault();

    this.element.querySelector(`[id^=rating-${this._currentScore}]`).checked = false;
    this._resetClickHandler();
  }
}

export default CardDetailsComponent;
