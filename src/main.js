import MoviesModel from "./models/movies";
import PageController from "./controllers/page";
import FilterController from "./controllers/filter";
import UserProfile from "./components/user-profile";
import {getMovie, getRandomIntegerNumber} from "./mock/movie";
import {RenderPosition, render} from "./utils/render";
import {getMoviesByFilter} from "./utils/filter";
import {FilterType} from "./const";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const MOVIES_COUNT = getRandomIntegerNumber(1, 10);

const mocksData = [...Array(MOVIES_COUNT)].map(getMovie);
const moviesModel = new MoviesModel();
moviesModel.movies = mocksData;

const userProfile = new UserProfile(getMoviesByFilter(moviesModel.allMovies, FilterType.HISTORY).length);
render(headerElement, userProfile.element, RenderPosition.BEFOREEND);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const pageController = new PageController(mainElement, moviesModel);
pageController.render();
