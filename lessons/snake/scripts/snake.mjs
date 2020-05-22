const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const SPEED = 3

const INC = {
  [DIRECTION.UP]: -(SPEED),
  [DIRECTION.DOWN]: SPEED,  
  [DIRECTION.RIGHT]: SPEED,
  [DIRECTION.LEFT]: -(SPEED),
}

const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
}

const DIRECTION_MAP = {
  [KEYS.UP]: DIRECTION.UP,
  [KEYS.DOWN]: DIRECTION.DOWN,
  [KEYS.LEFT]: DIRECTION.LEFT,
  [KEYS.RIGHT]: DIRECTION.RIGHT
}

const resetPosition = (max) => (pos) => {
  if (pos <= 0) {
    return max;
  } else if (pos >= max) {
    return 0;
  } else {
    return pos;
  }
}

export default class Snake {
  constructor(canvasWidth, canvasHeight, ctx) {
    this.state = {
      canvasWidth,
      canvasHeight,
      color: '#70bf35',
      width: 10,
      height: 10,
      body: [],
      direction: DIRECTION.UP
    }
    this.resetX = resetPosition(canvasWidth);
    this.resetY = resetPosition(canvasHeight);
    this.ctx = ctx;
    const hwp = Math.round(canvasWidth / 2);
    this.addBody(hwp, hwp);
    this.addEvents();
  }

  addEvents() {
    document.body.addEventListener('keydown', this.onChangeDirection.bind(this), { passive: true })
  }

  addBody(x, y) {
    const { width, height } = this.state;
    this.state.body.push({
      x,
      y,
      width,
      height
    })
  }

  onChangeDirection(e) {
    this.state.direction = DIRECTION_MAP[e.keyCode];
  }

  move() {
    const { direction } = this.state;
    this.state.body = this.state.body.map(({ x, y, ...args }) => {
      const isY = direction === DIRECTION.UP || direction === DIRECTION.DOWN;
      const isX = direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT;
      return {
        ...args,
        x: isX ? this.resetX(x + INC[direction]) : x,
        y: isY ? this.resetY(y + INC[direction]) : y,
      };
    })
  }

  render() {
    this.ctx.fillStyle = this.state.color;
    this.state.body.forEach((b) => {
      this.ctx.fillRect(b.x, b.y, b.width, b.height);
    })
    this.move();
  }
}