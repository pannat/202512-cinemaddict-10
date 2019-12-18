import AbstractComponent from "./abstract-component";


class MovieMainContainer extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return `<section class="films"></section>`;
  }
}

export default MovieMainContainer;
