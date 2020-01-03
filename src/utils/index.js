const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const ControlType = {
  FAVORITE: `favorite`,
  WATCHLIST: `watchlist`,
  ALREADY_WATCHED: `watched`
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

export {capitalizeFirstLetter, Key, SortType, ControlType};
