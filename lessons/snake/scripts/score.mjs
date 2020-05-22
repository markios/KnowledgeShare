export default class Score {
  constructor() {
    this.state = {
      score: 0,
      inc: 10,
    }

    this.el = document.querySelector('#score');
    this.reset();
  }

  reset() {
    this.state.score = 0;
    this.render();
  }

  increment() {
    this.state.score += this.state.inc;
    this.render();
  }

  render() {
    this.el.innerHTML = this.state.score;
  }
}