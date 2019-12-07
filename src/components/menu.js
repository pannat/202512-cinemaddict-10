import {capitalizeFirstLetter} from "../utils";

const getMenu = (filters) => `  <nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filters.map(({name, count}) => `<a href="#${name}" class="main-navigation__item">${capitalizeFirstLetter(name)} <span class="main-navigation__item-count">${count}</span></a>
    `).join(``)}
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;

export default getMenu;
