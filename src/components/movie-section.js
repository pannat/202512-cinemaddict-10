const getMovieSection = (title, modificator) => `<section class="films-list${modificator ? `--extra` : ``}">
      <h2 class="films-list__title ${!modificator ? `visually-hidden` : ``}">${title}</h2>
      <div class="films-list__container"></div></section>`;

export default getMovieSection;

