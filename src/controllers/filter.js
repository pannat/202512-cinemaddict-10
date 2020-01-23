import FilterComponent from "../components/filter";
import {FilterType} from "../const";
import {replace, render, RenderPosition} from "../utils/render";
import {getMoviesByFilter} from "../utils/filter";

class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL_MOVIES;
    this._filterComponent = null;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._moviesModel.dataChangeHandler = this._dataChangeHandler.bind(this);
  }

  render() {
    const allMovies = this._moviesModel.allMovies;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: filterType === this._activeFilterType
      };
    });
    const oldComponent = this._filterComponent;

    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.filterChangeHandler = this._filterChangeHandler;
    this._filterComponent.recoveryListeners();

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(this._container, this._filterComponent.element, RenderPosition.BEFOREEND);
    }
  }

  _filterChangeHandler(filterType) {
    this._moviesModel.filter = filterType;
    this._activeFilterType = filterType;
    this.render();
  }

  _dataChangeHandler() {
    this.render();
  }
}

export default FilterController;
