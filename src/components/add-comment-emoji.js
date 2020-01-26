import AbstractComponent from "./abstract-component";

class AddCommentEmojiComponent extends AbstractComponent {
  constructor(emoji) {
    super();
    this._emoji = emoji;
  }

  get template() {
    return `<img src="./images/emoji/${this._emoji}.png"  width="55" height="55" alt="emoji">`;
  }
}

export default AddCommentEmojiComponent;
