import MenuComponent from "./components/menu";
import SortComponent from "./components/sort";
import MovieMainContainerComponent from "./components/movie-main-container";
import MovieSectionComponent from "./components/movie-section";
import CardComponent from "./components/card";
import FullCardComponent from "./components/full-card";
import ButtonShowMoreComponent from "./components/button-show-more";
import UserRatingComponent from "./components/user-rating";
import MessageNotMovies from "./components/message-not-movies";
import {getMovie, getRandomIntegerNumber} from "./mock/movie";
import {RenderPosition, Key, render} from "./utils";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const MOVIES_COUNT = getRandomIntegerNumber(0, 15);
const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

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

const movieSectionData = [
  {
    title: `All movies. Upcoming`,
    hasModifier: false,
    movies: mocksData.slice(0, SHOWING_MOVIES_COUNT_ON_START)
  },
  {
    title: `Top rated`,
    hasModifier: true,
    movies: mocksData.slice(0).sort((a, b) => b.rating - a.rating)[0]
  },
  {
    title: `Most commented`,
    hasModifier: true,
    movies: mocksData.slice(0).sort((a, b) => b.comments.length - a.comments.length)[0]
  }
];

let showingMoviesCount = SHOWING_MOVIES_COUNT_ON_START;

const totalAlreadyWatchedMovies = filters.find((it) => it.name === `history`).count;


const renderMovieCard = (container, data) => {
  const cardComponent = new CardComponent(data);
  const posterCardElement = cardComponent.element.querySelector(`.film-card__poster`);
  const titleCardElement = cardComponent.element.querySelector(`.film-card__title`);
  const commentsCardElement = cardComponent.element.querySelector(`.film-card__comments`);

  const fullCardComponent = new FullCardComponent(data);
  const closeFullCardElement = fullCardComponent.element.querySelector(`.film-details__close-btn`);

  const closeFullCard = () => {
    fullCardComponent.element.remove();
  };

  const onKeydownPress = (evt) => {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
      closeFullCard();
    }
    window.removeEventListener(`keydown`, onKeydownPress);
  };

  const openFullCard = () => {
    closeFullCardElement.addEventListener(`click`, closeFullCard);
    window.addEventListener(`keydown`, onKeydownPress);

    render(bodyElement, fullCardComponent.element, RenderPosition.BEFOREEND);
  };

  posterCardElement.addEventListener(`click`, openFullCard);
  titleCardElement.addEventListener(`click`, openFullCard);
  commentsCardElement.addEventListener(`click`, openFullCard);

  render(container, cardComponent.element, RenderPosition.BEFOREEND);
};

const userRatingComponent = new UserRatingComponent(totalAlreadyWatchedMovies);
render(headerElement, userRatingComponent.element, RenderPosition.BEFOREEND);

const menuComponent = new MenuComponent(filters);
render(mainElement, menuComponent.element, RenderPosition.AFTERBEGIN);

const sortComponent = new SortComponent();
render(mainElement, sortComponent.element, RenderPosition.BEFOREEND);

const movieMainContainerComponent = new MovieMainContainerComponent();
render(mainElement, movieMainContainerComponent.element, RenderPosition.BEFOREEND);


movieSectionData.forEach((it) => {
  if (it.movies) {
    render(movieMainContainerComponent.element, new MovieSectionComponent(it.title, it.hasModifier).element, RenderPosition.BEFOREEND);
  }
});

const totalFilmsSection = movieMainContainerComponent.element.querySelector(`.films-list`);

const totalFilmsContainer = totalFilmsSection.querySelector(`.films-list__container`);

if (mocksData.length) {
  movieSectionData.find((it) => !it.hasModifier).movies.forEach((movie) => {
    renderMovieCard(totalFilmsContainer, movie);
  });
  const buttonShowMoreComponent = new ButtonShowMoreComponent();
  if (mocksData.length > SHOWING_MOVIES_COUNT_BY_BUTTON) {

    buttonShowMoreComponent.element.addEventListener(`click`, () => {
      const prevMoviesCount = showingMoviesCount;
      showingMoviesCount += SHOWING_MOVIES_COUNT_BY_BUTTON;

      mocksData.slice(prevMoviesCount, showingMoviesCount).
      forEach((movie) => renderMovieCard(totalFilmsContainer, movie));

      if (showingMoviesCount >= mocksData.length) {
        buttonShowMoreComponent.element.remove();
        buttonShowMoreComponent.removeElement();
      }

    });
    render(totalFilmsSection, buttonShowMoreComponent.element, RenderPosition.BEFOREEND);
  }
} else {
  totalFilmsSection.innerHTML = ``;
  render(totalFilmsSection, new MessageNotMovies().element, RenderPosition.BEFOREEND);
}

const filmsContainersExtra = movieMainContainerComponent.element.querySelectorAll(`.films-list--extra .films-list__container`);

movieSectionData.filter((it) => it.hasModifier && it.movies).forEach(({movies}, index) => {
  renderMovieCard(filmsContainersExtra[index], movies);
});


