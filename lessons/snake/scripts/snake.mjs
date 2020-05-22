const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const SPEED = 10;

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

const INVERSE_DIRECTIONS = {
  [DIRECTION.UP]: DIRECTION.DOWN,
  [DIRECTION.DOWN]: DIRECTION.UP,
  [DIRECTION.LEFT]: DIRECTION.RIGHT,
  [DIRECTION.RIGHT]: DIRECTION.LEFT
}

const resetPosition = (max) => (pos) => {
  if (pos <= (0 - 10)) {
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
      stroke: '#467721',
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

  getPosition() {
    return this.state.body;
  }
  
  get width() {
    return this.state.width;
  }

  get height() {
    return this.state.height;
  }

  get body() {
    return this.state.body;
  }

  get head() {
    return this.state.body[0];
  }

  grow(next) {
    this.next = next;
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
    const newDirection = DIRECTION_MAP[e.keyCode];
    const inverse = INVERSE_DIRECTIONS[this.state.direction]

    if (newDirection === inverse) return;
    this.state.direction = DIRECTION_MAP[e.keyCode];
  }

  move() {
    const { direction, body } = this.state;
    
    for (let i = body.length - 1, j = 0; i >= j; i-=1 ) {
      if (i > 0) {
        const prev = this.state.body[i - 1];
        this.state.body[i].x = prev.x;
        this.state.body[i].y = prev.y;
        continue;
      }
      
      const isY = direction === DIRECTION.UP || direction === DIRECTION.DOWN;
      const isX = direction === DIRECTION.LEFT || direction === DIRECTION.RIGHT;
      const { x, y, ...args } = this.state.body[i];
      this.state.body[i] = {
        ...args,
        x: isX ? this.resetX(x + INC[direction]) : x,
        y: isY ? this.resetY(y + INC[direction]) : y,
      };
    }
  }

  postRender() {
    this.move();
    if (this.next) {
      this.addBody(this.next.x, this.next.y);
      this.next = null;
    }
  }

  render() {
    this.state.body.forEach((b) => {
      this.ctx.fillStyle = this.state.color;
      this.ctx.fillRect(b.x, b.y, b.width, b.height);
      this.ctx.strokeStyle = this.state.stroke;
      this.ctx.strokeRect(b.x, b.y, b.width, b.height);
    })
    this.postRender();
  }
}