const getUserRating = (count) => {
  const rank = new Map([
    [count === 0, ``],
    [(count > 0 && count < 10), `novice`],
    [(count > 10 && count < 20), `fan`],
    [count > 20, `movie buff`],
  ]);

  return `<section class="header__profile profile">
    <p class="profile__rating">${rank.get(true)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
}


export default getUserRating;
