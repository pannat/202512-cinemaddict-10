const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const ControlType = {
  FAVORITE: `favorite`,
  WATCHLIST: `add-to-watchlist`,
  ALREADY_WATCHED: `mark-as-watched`
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const Key = {
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {capitalizeFirstLetter, RenderPosition, Key, createElement, render, SortType, ControlType};
