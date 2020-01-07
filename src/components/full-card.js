import AbstractSmartComponent from "./abstract-smart-component";
import {capitalizeFirstLetter} from "../utils";

class FullCard extends AbstractSmartComponent {
  constructor({title, poster, director, writers, actors, releaseDate, runtime, country, genres, rating, description, comments, ageLimit, isFavorite, isAddedWatchlist, isAlreadyWatched}) {
    super();
    this._title = title;
    this._poster = poster;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._country = country;
    this._genres = genres;
    this._rating = rating;
    this._description = description;
    this._comments = comments;
    this._ageLimit = ageLimit;
    this._isFavorite = isFavorite;
    this._isAddedWatchlist = isAddedWatchlist;
    this._isAlreadyWatched = isAlreadyWatched;

    this._closeClickHandler = null;
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
              <td class="film-details__cell">${new Date(this._releaseDate).toDateString().slice(4)}</td>
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
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>

        <ul class="film-details__comments-list">

        ${this._comments.map((comment) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${comment.emoji}.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${comment.message}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${comment.author}</span>
                <span class="film-details__comment-day">${new Date(comment.date).toDateString()}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`).join(``)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
  }

  set closeClickHandler(handler) {
    this._closeClickHandler = handler;
  }

  set controlsClickHandler(handler) {
    this._controlsClickHandler = handler;
  }

  recoveryListeners() {
    this.element.querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closeClickHandler);

    // this.element.querySelector(`.film-details__controls`).addEventListener(`click`, (evt) => {
    //
    //   if (evt.target.tagName !== `INPUT`) {
    //     return;
    //   }
    //
    //   this._controlsClickHandler(evt.target.name);
    // });
  }

  // reset() {
  //   const controls = {
  //     isFavorite: this._isFavorite,
  //     isAddedWatchlist: this._isAddedWatchlist,
  //     isAlreadyWatched: this._isAlreadyWatched
  //   };
  //
  //   this._isFavorite = controls.isFavorite;
  //   this._isAddedWatchlist = controls.isAddedWatchlist;
  //   this._isAlreadyWatched = controls.isAlreadyWatched;
  //
  //   this.rerender();
  // }
}

export default FullCard;
