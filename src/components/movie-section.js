import AbstractComponent from "./abstract-component";

class MovieSection extends AbstractComponent {
  constructor(title, modifier) {
    super();
    this._title = title;
    this._modifier = modifier;
  }

  get template() {
    return `<section class="films-list${this._modifier ? `--extra` : ``}">
      <h2 class="films-list__title ${!this._modifier ? `visually-hidden` : ``}">${this._title}</h2>
      <div class="films-list__container"></div></section>`;
  }
}

export default MovieSection;

