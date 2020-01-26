import MainNavComponent from "../components/main-nav";
import {FilterType} from "../const";
import {replace, render, RenderPosition} from "../utils/render";
import {getMoviesByFilter} from "../utils/filter";
import {SCREEN} from "../const";

class MainNavController {
  constructor(container, moviesModel, toggleScreenHandler) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._activeFilterType = FilterType.ALL_MOVIES;
    this._currentScreen = SCREEN.MOVIES;
    this._toggleScreenHandler = toggleScreenHandler;
    this._mainNavComponent = null;
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._moviesModel.dataChangeHandler = this._dataChangeHandler.bind(this);
    this._navItemClickHandler = this._navItemClickHandler.bind(this);
  }

  render() {
    const allMovies = this._moviesModel.allMovies;
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getMoviesByFilter(allMovies, filterType).length,
        checked: this._currentScreen === SCREEN.MOVIES ? filterType === this._activeFilterType : false
      };
    });

    const oldComponent = this._mainNavComponent;

    this._mainNavComponent = new MainNavComponent(filters);
    this._mainNavComponent.filterChangeHandler = this._navItemClickHandler;
    this._mainNavComponent.recoveryListeners();

    if (oldComponent) {
      replace(this._mainNavComponent, oldComponent);
    } else {
      render(this._container, this._mainNavComponent.element, RenderPosition.AFTERBEGIN);
    }
  }

  _navItemClickHandler(item) {
    if (item === SCREEN.STATS) {
      this._currentScreen = SCREEN.STATS;
      this.render();
    } else {
      this._currentScreen = SCREEN.MOVIES;
      this._filterChangeHandler(item);
    }
    this._toggleScreenHandler(this._currentScreen);
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

export default MainNavController;
