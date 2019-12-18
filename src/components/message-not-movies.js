import AbstractComponent from "./abstract-component";

class MessageNotMovies extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }
}

export default MessageNotMovies;
