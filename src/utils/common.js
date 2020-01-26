const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const formatRuntime = (min) => {
  let hours = 0;
  if (min > 60) {
    hours = Math.floor(min / 60);
    min = min - (60 * hours);
  }
  return `${ hours ? `${hours}h` : ``}${ min > 0 ? ` ${min}m` : ``}`.trim();
};

const calculateUserRank = (count) => {
  let rank = ``;
  if (count > 0 && count < 10) {
    rank = `novice`;
  } else if (count > 10 && count < 20) {
    rank = `fan`;
  } else if (count > 20) {
    rank = `movie buff`;
  }

  return rank;
}

export {capitalizeFirstLetter, formatRuntime, calculateUserRank};
