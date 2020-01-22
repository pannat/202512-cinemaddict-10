const capitalizeFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const formatRuntime = (min) => {
  let hours = 0;
  if (min > 60) {
    hours = Math.floor(min / 60);
    min = min - (60 * hours);
  }
  return `${ hours ? `${hours}h` : ``}${ min > 0 ? ` ${min}m` : ``}`.trim();
};

export {capitalizeFirstLetter, formatRuntime};
