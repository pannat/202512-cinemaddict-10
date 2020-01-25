import AbstractSmartComponent from "./abstract-smart-component";

class commentsSection extends AbstractSmartComponent {
  constructor() {
    super();
  }

  get template() {
    return `<section class="film-details__comments-wrap">
        <ul class="film-details__comments-list">
        </ul>
      </section>`;
  }

  get commentsList() {
    return this.element.querySelector(`.film-details__comments-list`);
  }
}

export default commentsSection;
