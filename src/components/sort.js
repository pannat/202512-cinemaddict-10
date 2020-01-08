import AbstractComponent from "./abstract-component";
import {SortType} from "../utils";

class SortComponent extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  get template() {
    return `<ul class="sort">
    <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
  </ul>`;
  }

  setClickHandler(handler) {
    this.element.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this.element.querySelector(`[data-sort-type="${this._currentSortType}"]`).classList.remove(`sort__button--active`);
      this.element.querySelector(`[data-sort-type="${sortType}"]`).classList.add(`sort__button--active`);
      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}

export default SortComponent;

