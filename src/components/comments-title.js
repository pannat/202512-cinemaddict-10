import AbstractComponent from "./abstract-component";

class CommentsTitleComponent extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  get template() {
    return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._count}</span></h3>`;
  }
}

export default CommentsTitleComponent;
