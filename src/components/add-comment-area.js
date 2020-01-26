import {Emoji} from "../const";
import he from "he";
import AbstractSmartComponent from "./abstract-smart-component";

class addCommentAreaComponent extends AbstractSmartComponent {
  constructor() {
    super();
    this._textarea = null;
    this._newEmojiClickHandler = null;
    this._currentEmoji = Emoji.SMILE;
  }

  get template() {
    return `<div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">

            ${Object.keys(Emoji).map((key) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${Emoji[key]}" value="${Emoji[key]}">
            <label class="film-details__emoji-label" for="emoji-${Emoji[key]}">
              <img src="./images/emoji/${Emoji[key]}.png" width="30" height="30" alt="emoji">
            </label>`).join(``)}
          </div>
        </div>`;
  }

  get currentEmoji() {
    return this._currentEmoji;
  }

  get userMessage() {
    const message = this.element.querySelector(`.film-details__comment-input`).value;
    return he.encode(message);
  }

  get addEmojiContainer() {
    return this.element.querySelector(`.film-details__add-emoji-label`);
  }

  set newEmojiClickHandler(handler) {
    this._newEmojiClickHandler = (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      this._currentEmoji = evt.target.value;
      handler(evt.target.value);
    };
  }

  recoveryListeners() {
    this.element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._newEmojiClickHandler);
  }
}

export default addCommentAreaComponent;
