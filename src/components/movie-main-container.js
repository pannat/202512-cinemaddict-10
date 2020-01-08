import AbstractComponent from "./abstract-component";

class MovieMainContainerComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return `<section class="films"></section>`;
  }
}

export default MovieMainContainerComponent;
