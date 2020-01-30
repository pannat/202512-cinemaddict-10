import API from './api.js';
import MoviesModel from "./models/movies";
import PageController from "./controllers/page";
import MainNavController from "./controllers/main-nav";
import StatsController from "./controllers/stats";
import UserProfile from "./components/user-profile";
import {RenderPosition, render} from "./utils/render";
import {getMoviesByFilter} from "./utils/filter";
import {FilterType, SCREEN, AUTHORIZATION, END_POINT} from "./const";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();
const pageController = new PageController(mainElement, moviesModel);
const statsController = new StatsController(mainElement, moviesModel);

const toggleScreenHandler = (screen) => {
  if (screen === SCREEN.STATS) {
    pageController.hide();
    statsController.show();
  } else {
    pageController.show();
    statsController.hide();
  }
};

api.getMovies()
  .then((movies) => {
    moviesModel.movies = movies;
    pageController.render();

    const userProfile = new UserProfile(getMoviesByFilter(moviesModel.allMovies, FilterType.HISTORY).length);
    render(headerElement, userProfile.element, RenderPosition.BEFOREEND);


    statsController.render();
    statsController.hide();

    const mainNavController = new MainNavController(mainElement, moviesModel, toggleScreenHandler);
    mainNavController.render();
  });

