import getMenu from "./components/menu";
import getSort from "./components/sort";
import getMovieContainer from "./components/movie-main-container";
import getMovieSection from "./components/movie-section";
import getCard from "./components/card";
import getFullCard from "./components/full-card";
import getButtonShowMore from "./components/button-show-more";
import getUserRating from "./components/user-rating";
import {getMovie} from "./mock/movie";

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const MOVIES_COUNT = 11;
const SHOWING_MOVIES_COUNT_ON_START = 5;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 5;

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

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

mocksData.forEach((mock) => render(bodyElement, `beforeend`, getFullCard(mock)));
render(headerElement, `beforeend`, getUserRating(filters.find((it) => it.name === `watchlist`).count));

render(mainElement, `afterbegin`, getMenu(filters));
render(mainElement, `beforeend`, getSort());
render(mainElement, `beforeend`, getMovieContainer());
const movieSection = mainElement.querySelector(`.films`);


movieSectionData.forEach((it) => {
  if (it.movies) {
    render(movieSection, `beforeend`, getMovieSection(it.title, it.hasModifier));
  }
});

const totalFilmsSection = movieSection.querySelector(`.films-list`);
render(totalFilmsSection, `beforeend`, getButtonShowMore());
const totalFilmsContainer = totalFilmsSection.querySelector(`.films-list__container`);
render(totalFilmsContainer, `beforeend`, movieSectionData.find((it) => !it.hasModifier).movies.map(getCard).join(``));
const filmsContainersExtra = movieSection.querySelectorAll(`.films-list--extra .films-list__container`);

movieSectionData.filter((it) => it.hasModifier && it.movies).forEach(({movies}, index) => render(filmsContainersExtra[index], `beforeend`, getCard(movies)));
const buttonShowMore = totalFilmsSection.querySelector(`.films-list__show-more`);

buttonShowMore.addEventListener(`click`, () => {
  const prevMoviesCount = showingMoviesCount;
  showingMoviesCount += SHOWING_MOVIES_COUNT_BY_BUTTON;

  mocksData.slice(prevMoviesCount, showingMoviesCount).
    forEach((movie) => render(totalFilmsContainer, `beforeend`, getCard(movie)));

  if (showingMoviesCount >= mocksData.length) {
    buttonShowMore.remove();
  }

});
