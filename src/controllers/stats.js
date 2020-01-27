import StatsComponent from "../components/stats";
import {render, RenderPosition} from "../utils/render";
import {getHistoryMovies} from "../utils/filter";
// import {capitalizeFirstLetter, formatRuntime} from "../utils/common";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

class StatsController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._statsComponent = null;
    this._chart = null;
  }

  render() {
    const movies = getHistoryMovies(this._moviesModel.allMovies);

    const genres = movies.map((movie) => movie.genres).flat();
    const uniqueGenres = Array.from(new Set(genres));
    const countMovies = [];
    const entitiesGenre = uniqueGenres.map((genre) => {
      const count = movies.filter((movie) => movie.genres.some((it) => it === genre)).length;
      countMovies.push(count);
      return {
        genre,
        count
      };
    });

    const topGenre = entitiesGenre.sort((a, b) => b.count - a.count)[0].genre;
    const fullRuntime = movies.map((it) => it.runtime).reduce((acc, time) => acc + time);
    const countWatchedMovies = movies.length;

    if (this._statsComponent && this._chart) {
      this._statsComponent.rerender(countWatchedMovies, fullRuntime, topGenre)
    } else {
      this._statsComponent = new StatsComponent(countWatchedMovies, fullRuntime, topGenre);
      render(this._container, this._statsComponent.element, RenderPosition.BEFOREEND);
      this.renderChart(countMovies, uniqueGenres);
    }
  }

  renderChart(countMovies, uniqueGenres) {
    this._chart = new Chart(this._statsComponent.ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        datasets: [{
          data: countMovies,
          backgroundColor: `#ffe800`,
        }]
      },
      options: {
        responsive: false,
        plugins: {
          datalabels: {
            font: {
              size: 16,
            },
            anchor: `end`,
            clamp: `true`,
            align: `start`,
            formatter(value) {
              return value ? `${value} movie` : ``;
            }
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              display: false
            },
          }],
          yAxes: [{
            position: `left`,
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              fontStyle: `bold`,
              fontSize: 16,
              fontColor: `#ffffff`,
            },
            labels: uniqueGenres,
            barThickness: `flex`,
            minBarLength: 35,
            maxBarThickness: 40
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      },
    });
  }

  show() {
    this._statsComponent.show();
  }

  hide() {
    this._statsComponent.hide();
  }
}

export default StatsController;
