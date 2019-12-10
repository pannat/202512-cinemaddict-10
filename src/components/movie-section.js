import {createElement} from "../utils";

class MovieSection {
  constructor(title, modifier) {
    this._title = title;
    this._modifier = modifier;
    this._element = null;
  }

  get element() {
    if (this._element === null) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `<section class="films-list${this._modifier ? `--extra` : ``}">
      <h2 class="films-list__title ${!this._modifier ? `visually-hidden` : ``}">${this._title}</h2>
      <div class="films-list__container"></div></section>`;
  }

  removeElement() {
    this._element = null;
  }
}

export default MovieSection;

