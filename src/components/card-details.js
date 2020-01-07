import AbstractSmartComponent from "./abstract-smart-component";

const ratingPoints = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class CardDetailsComponent extends AbstractSmartComponent {
  constructor({title, poster}) {
    super();
    this._title = title;
    this._poster = poster;
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
                  ${ratingPoints.map((it) => {
    return `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${it}" id="rating-${it}-${this._title}">
      <label class="film-details__user-rating-label" for="rating-${it}-${this._title}">${it}</label>`;
  }).join(``)}
              </div>
          </section>
      </div>
    </section>`;
  }

  recoveryListeners() {
    this.element.querySelector(`.film-details__user-rating-score`).addEventListener(`change`, (evt) => {
      console.log(evt.target.value)
    })
  }
}

export default CardDetailsComponent;
