import StatsComponent from "../components/stats";
import {render, RenderPosition} from "../utils/render";
import {capitalizeFirstLetter} from "../utils/common";
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
    this._statsComponent = new StatsComponent();
    render(this._container, this._statsComponent.element, RenderPosition.BEFOREEND);
    this.renderChart();
  }

  show() {
    this._statsComponent.show();
  }

  hide() {
    this._statsComponent.hide();
  }

  renderChart() {
    const movies = this._moviesModel.allMovies;

    const genres = this._moviesModel.allMovies.map((movie) => movie.genres).flat();
    const uniqueGenres = Array.from(new Set(genres));

    const getCountMovies = (genre) => {
      return movies.filter((movie) => movie.genres.some((it) => it === genre)).length;
    };
    const countMovies = uniqueGenres.map(getCountMovies);

    const allTime = movies.reduce((acc, movie) => acc + +movie.runtime);
    console.log(movies.forEach((it) => console.log(it.runtime)));



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
}

export default StatsController;
