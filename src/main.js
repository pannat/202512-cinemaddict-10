import MenuComponent from "./components/menu";
import Page from "./controllers/page";
import UserRatingComponent from "./components/user-rating";
import {getMovie, getRandomIntegerNumber} from "./mock/movie";
import {RenderPosition, render} from "./utils/render";

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

const pageController = new Page(mainElement, mocksData);
pageController.render();
