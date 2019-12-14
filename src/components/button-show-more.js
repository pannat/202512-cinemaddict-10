import AbstractComponent from "./abstract-component";

class ButtonShowMore extends AbstractComponent {
  get template() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}

export default ButtonShowMore;
