import StatsComponent from "../components/stats";
import {render, RenderPosition} from "../utils/render";

class StatsController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._statsComponent = null;
  }

  render() {
    this._statsComponent = new StatsComponent();
    render(this._container, this._statsComponent.element, RenderPosition.BEFOREEND);
  }

  show() {
    this._statsComponent.show();
  }

  hide() {
    this._statsComponent.hide();
  }
}

export default StatsController;
