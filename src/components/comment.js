import AbstractComponent from "./abstract-component";
import moment from "moment";

class Comment extends AbstractComponent {
  constructor({id, emoji, message, author, date}) {
    super();
    this._id = id;
    this._emoji = emoji;
    this._message = message;
    this._author = author;
    this._date = moment(date).format(`YYYY/MM/DD HH:MM`);

    this._deleteClickHandler = null;
  }

  get template() {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${this._message}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${this._author}</span>
                <span class="film-details__comment-day">${this._date}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  }

  get id() {
    return this._id;
  }

  set deleteClickHandler(handler) {
    this._deleteClickHandler = (evt) => {
      evt.preventDefault();
      handler(this.id);
    };
  }

  recoveryListeners() {
    this.element.querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }
}

export default Comment;
