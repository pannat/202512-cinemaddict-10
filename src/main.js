import MenuComponent from "./components/menu";
import SortComponent from "./components/sort";
import MovieMainContainerComponent from "./components/movie-main-container";
import PageController from "./controllers/pageController";
import UserRatingComponent from "./components/user-rating";
import {getMovie, getRandomIntegerNumber} from "./mock/movie";
import {RenderPosition, render} from "./utils";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const MOVIES_COUNT = getRandomIntegerNumber(0, 15);

const mocksData = [...Array(MOVIES_COUNT)].map(getMovie);

const filters = [{
  name: `watchlist`,
  count: mocksData.filter((mock) => mock.isAddedWatchlist).length
},
{
  name: `history`,
  count: mocksData.filter((mock) => mock.isAlreadyWatched).length
},
{
  name: `favorites`,
  count: mocksData.filter((mock) => mock.isFavorite).length
}];

const totalAlreadyWatchedMovies = filters.find((it) => it.name === `history`).count;

const userRatingComponent = new UserRatingComponent(totalAlreadyWatchedMovies);
render(headerElement, userRatingComponent.element, RenderPosition.BEFOREEND);

const menuComponent = new MenuComponent(filters);
render(mainElement, menuComponent.element, RenderPosition.AFTERBEGIN);

const sortComponent = new SortComponent();
render(mainElement, sortComponent.element, RenderPosition.BEFOREEND);

const movieMainContainerComponent = new MovieMainContainerComponent();
render(mainElement, movieMainContainerComponent.element, RenderPosition.BEFOREEND);

const pageController = new PageController(movieMainContainerComponent.element, mocksData);
pageController.render();
