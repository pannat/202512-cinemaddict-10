const titleItems = [
  `Gisaengchung`,
  `Manbiki kazoku`,
  `Frozen II`,
  `Maleficent: Mistress of Evil`,
  `Il Peccato`,
  `The Donkey King`,
  `On a Magical Night`,
  `Ermitage. Il potere dell'arte`,
  `Eyes Wide Shut`,
  `Star Wars: Episode IX - The Rise of Skywalker`,
  `Black Christmas`,
  `The Kindness of Strangers`,
  `Halston`,
  `Baikal`,
  `Red Shoes`
];

const posterNames = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const emojiPictures = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`,
  `trophy`
];

const descriptionItems = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `);

const directors = [
  `Martin Scorsese`,
  `Peter Jackson`,
  `Steven Spielberg`,
  `Tim Burton`,
  `David Fincher`,
  `David Lynch`,
  `Christopher Nolan`
];

const writers = [
  `Johns Jack`,
  `Willis Thomas`,
  `Parsons Peter`,
  `Booker Mae`,
  `Powers Dorothy`,
  `James Rebecca`
];

const actors = [
  `Bradford Candice`,
  `Logan Annabella`,
  `Richardson Amberly`,
  `Garrison Julianaу`,
  `Hancock Percival`,
  `Parker Joseph`
];

const countries = [
  `USA`,
  `Russia`,
  `Deutchland`,
  `Ukraina`,
  `France`
];

const ageLimits = [
  `18`,
  `16`,
  `12`,
  `6`,
  `0`
];

const genres = [
  `surreal`,
  `action`,
  `adventure`,
  `comedy`,
  `crime`,
  `drama`,
  `fantasy`,
  `historical`
];

const getRandomRuntime = () => {
  let min = getRandomIntegerNumber(0, 181);
  let hours = 0;
  if (min > 60) {
    hours = Math.floor(min / 60);
    min = min - (60 * hours);
  }
  return `${ hours ? `${hours}h` : ``}${ min > 0 ? ` ${min}m` : ``}`.trim();
};

const getRandomDate = () => Date.now() - getRandomIntegerNumber(0, 18250) * 24 * 60 * 60 * 1000;


const getRandomNewArray = (array) => new Array(getRandomIntegerNumber(1, 4)).fill(``).map(() => getRandomArrayItem(array));


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

let id = 0;

const getMovie = () => (
  {
    id: id++,
    title: getRandomArrayItem(titleItems),
    poster: getRandomArrayItem(posterNames),
    description: getRandomNewArray(descriptionItems).join(``),
    director: getRandomArrayItem(directors),
    writers: getRandomNewArray(writers),
    actors: getRandomNewArray(actors),
    releaseDate: getRandomDate(),
    runtime: getRandomRuntime(),
    country: getRandomArrayItem(countries),
    rating: Number(`${getRandomIntegerNumber(0, 10)}.${getRandomIntegerNumber(0, 10)}`),
    genres: getRandomNewArray(genres),
    ageLimit: getRandomArrayItem(ageLimits),
    isFavorite: Boolean(getRandomIntegerNumber(0, 2)),
    isAddedWatchlist: Boolean(getRandomIntegerNumber(0, 2)),
    isAlreadyWatched: Boolean(getRandomIntegerNumber(0, 2)),
    personalRating: getRandomIntegerNumber(1, 10),
    comments: [...Array(getRandomIntegerNumber(0, 10))].map(() => ({
      author: getRandomArrayItem(writers),
      message: getRandomNewArray(descriptionItems).join(``),
      date: getRandomDate(),
      emoji: getRandomArrayItem(emojiPictures)
    }))
  }
);

export {getMovie, getRandomIntegerNumber};
