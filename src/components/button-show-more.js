import AbstractComponent from "./abstract-component";

class ButtonShowMore extends AbstractComponent {
  get template() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(handler) {
    this.element.addEventListener(`click`, handler);
  }
}

export default ButtonShowMore;
