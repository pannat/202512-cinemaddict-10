import getMenu from "./components/menu";
import getSort from "./components/sort";
import getMovieContainer from "./components/movie-main-container";
import getMovieSection from "./components/movie-section";
import getCard from "./components/card";
import getFullCard from "./components/full-card";
import getButtonShowMore from "./components/button-show-more";
import getUserRating from "./components/user-rating";
import {getMovie} from "./mock/movie";

const mocksData = [...Array(5)].map(getMovie);

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

const movieSectionData = [
  {
    title: `All movies. Upcoming`,
    hasModifier: false,
    movies: mocksData
  },
  {
    title: `Top rated`,
    hasModifier: true,
    movies: mocksData.filter((it) => parseInt(it.rating, 10) > 5)
  },
  {
    title: `Most commented`,
    hasModifier: true,
    movies: mocksData.filter((it) => it.comments.length > 5)
  }
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
mocksData.forEach((mock) => render(bodyElement, `beforeend`, getFullCard(mock)));
render(headerElement, `beforeend`, getUserRating());
render(mainElement, `afterbegin`, getMenu());
render(mainElement, `beforeend`, getSort());
render(mainElement, `beforeend`, getMovieContainer());
const movieSection = mainElement.querySelector(`.films`);


movieSectionData.forEach((it) => {
  if (it.movies.length > 0) {
    render(movieSection, `beforeend`, getMovieSection(it.title, it.hasModifier));
  }
});

const totalFilmsSection = movieSection.querySelector(`.films-list`);
render(totalFilmsSection, `beforeend`, getButtonShowMore());
const totalFilmsContainer = totalFilmsSection.querySelector(`.films-list__container`);
render(totalFilmsContainer, `beforeend`, mocksData.map(getCard).join(``));
const filmsContainersExtra = movieSection.querySelectorAll(`.films-list--extra .films-list__container`);

movieSectionData.filter((it) => it.hasModifier).forEach(({movies}, index) => render(filmsContainersExtra[index], `beforeend`, movies.map(getCard).join(``)));
