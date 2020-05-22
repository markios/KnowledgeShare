
function randomTen(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function collision(snake, food) {
  return snake.body.some(b => { return (b.x === food.x && b.y === food.y) })
}

const getFoodPosition = (snake, w, h) => {
  let x = randomTen(0, w - snake.width);
  let y = randomTen(0, h - snake.height);

  if (collision(snake, { x, y })) {
    return getPosition(snake, w, h);
  } else {
    return { x, y }
  }
}

export default class Food {
  constructor(canvasWidth, canvasHeight, ctx, snake) {
    this.state = {
      ...getFoodPosition(snake, canvasWidth, canvasHeight),
      width: 10,
      height: 10,
      color: '#dcc518'
    };
    this.ctx = ctx;
  }

  getPosition() {
    return {
      x: this.state.x,
      y: this.state.y
    };
  }

  render() {
    const { color, x, y, width, height } = this.state;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }
}