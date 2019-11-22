import getMenu from "./components/menu";
import getSort from "./components/sort";
import getMovieContainer from "./components/movie-main-container";
import getMovieSection from "./components/movie-section";
import getCard from "./components/card";
import getFullCard from "./components/full-card";
import getButtonShowMore from "./components/button-show-more";
import getUserRating from "./components/user-rating";

const render = (container, position, template) => {
  container.insertAdjacentHTML(position, template);
};

const movieSectionData = [
  {
    title: `All movies. Upcoming`,
    hasModificator: false
  },
  {
    title: `Top rated`,
    hasModificator: true
  },
  {
    title: `Most commented`,
    hasModificator: true
  }
];

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
render(bodyElement, `beforeend`, getFullCard());
render(headerElement, `beforeend`, getUserRating());
render(mainElement, `afterbegin`, getMenu());
render(mainElement, `beforeend`, getSort());
render(mainElement, `beforeend`, getMovieContainer());
const movieSection = mainElement.querySelector(`.films`);


render(movieSection, `beforeend`, movieSectionData.map((it) => getMovieSection(it.title, it.hasModificator)).join(``));
const totalFilmsSection = movieSection.querySelector(`.films-list`);
render(totalFilmsSection, `beforeend`, getButtonShowMore());
const totalFilmsContainer = totalFilmsSection.querySelector(`.films-list__container`);
render(totalFilmsContainer, `beforeend`, new Array(5).fill(getCard()).join(``));
const filmsContainersExtra = movieSection.querySelectorAll(`.films-list--extra .films-list__container`);


filmsContainersExtra.forEach((el) => render(el, `beforeend`, new Array(2).fill(getCard()).join(``)));
