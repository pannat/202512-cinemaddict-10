import AbstractComponent from "./abstract-component";

class ButtonShowMoreComponent extends AbstractComponent {
  get template() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(handler) {
    this.element.addEventListener(`click`, handler);
  }
}

export default ButtonShowMoreComponent;
