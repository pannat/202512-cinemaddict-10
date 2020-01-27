import AbstractSmartComponent from "./abstract-smart-component";
import {calculateUserRank, capitalizeFirstLetter} from "../utils/common";
import {RangesStats} from "../const";

class StatsComponent extends AbstractSmartComponent {
  constructor(countWatchedMovies, timeSpent, topGenre) {
    super();
    this._countWatchedMovies = countWatchedMovies;
    this._timeSpent = timeSpent;
    this._topGenre = topGenre;
    this._userRank = calculateUserRank(countWatchedMovies);
    this._currentRange = RangesStats.ALL_TIME;
    this._filterChangeHandler = null;

    this.recoveryListeners();
  }

  get template() {
    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${this._userRank}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
        ${Object.keys(RangesStats).map((range) => `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${RangesStats[range]}" value="${RangesStats[range]}"
            ${RangesStats[range] === this._currentRange ? `checked` : ``}>
      <label for="statistic-${RangesStats[range]}" class="statistic__filters-label">${capitalizeFirstLetter(RangesStats[range])}</label>`).join(``)}
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${this._countWatchedMovies} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
  }

  get ctx() {
    return this.element.querySelector(`.statistic__chart`);
  }

  set filterChangeHandler(handler) {
    this._filterChangeHandler = (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }
      this._currentRange = evt.target.value;
      handler(evt.target.value);
    };
  }

  rerender(countWatchedMovies, timeSpent, topGenre) {
    this._countWatchedMovies = countWatchedMovies;
    this._timeSpent = timeSpent;
    this._topGenre = topGenre;
    super.rerender();
  }

  recoveryListeners() {
    this.element.querySelector(`form`).addEventListener(`change`, this._filterChangeHandler);
  }
}

export default StatsComponent;
