import Snake from "./snake.mjs";
import Food from "./food.mjs";


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
    setInterval(() => {
      this.render();
      this.detectCollisions();
    }, 100);
  }
  
  detectCollisions() {
    const snake = this.snake.head;
    const food = this.food.position;

    if (snake.x === food.x && snake.y === food.y) {
      this.snake.grow(food);
      this.setFood();
    }
  }

  clearCanvas() {
    const { backgroundColor, width, height } = this.state;
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
  }

  newGame() {
    this.snake = new Snake(this.state.width, this.state.height, this.ctx);
    this.setFood();
  }

  setFood() {
    this.food = new Food(this.state.width, this.state.height, this.ctx, this.snake);
  }

  render() {
    this.clearCanvas();
    this.snake.render();
    this.food.render();
  }
}