export default class AreaMeasurement3D {
  constructor () {
    this.started=false;
    this.viewModel = {
      start: () => {
        this.started=true;
      }
    }
    this.destroy = () => {
      this.started=false;
    }
  }
}