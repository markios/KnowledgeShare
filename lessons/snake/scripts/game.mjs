import Snake from "./snake.mjs";

export default class Game {
  constructor() {
    // find canvas
    // set off timer to render the game
    this.state = {
      backgroundColor: 'white',
      width: 500,
      height: 500
    }
    this.x = 0;
    this.init();
    this.newGame();
  }

  init() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    setInterval(() => this.render(), 1000 / 60);
  }

  clearCanvas() {
    const { backgroundColor, width, height } = this.state;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
  }

  newGame() {
    this.snake = new Snake(this.state.width, this.state.height, this.ctx);
  }

  render() {
    this.clearCanvas();
    this.snake.render()
  }
}