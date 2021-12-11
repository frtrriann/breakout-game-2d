class Brick implements GameObjectInterface {
  canvas;
  ctx;
  x: number;
  y: number;
  status: number = 1;
  readonly width = 75;
  readonly height = 20;
  readonly padding = 10;
  readonly offsetTop = 30;
  readonly offsetLeft = 30;
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    column: number,
    row: number
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = column * (this.width + this.padding) + this.offsetLeft;
    this.y = row * (this.height + this.padding) + this.offsetTop;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  destroy() {
    this.status = 0;
  }

  get isDestroyed() {
    return this.status === 0;
  }
}

export class Bricks {
  canvas;
  ctx;
  bricks: Brick[][] = [];
  readonly rowCount = 3;
  readonly columnCount = 5;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.createBricks();
  }

  createBricks() {
    for (let column = 0; column < this.columnCount; column++) {
      this.bricks[column] = [];
      for (let row = 0; row < this.rowCount; row++) {
        this.bricks[column][row] = new Brick(
          this.canvas,
          this.ctx,
          column,
          row
        );
      }
    }
  }

  detectBallCollision(ballX: number, ballY: number): boolean {
    for (let column = 0; column < this.columnCount; column++) {
      for (let row = 0; row < this.rowCount; row++) {
        const brick = this.bricks[column][row];
        if (
          !brick.isDestroyed &&
          ballX > brick.x &&
          ballX < brick.x + brick.width &&
          ballY > brick.y &&
          ballY < brick.y + brick.height
        ) {
          brick.destroy();
          return true;
        }
      }
    }
    return false;
  }

  draw() {
    for (let column = 0; column < this.columnCount; column++) {
      for (let row = 0; row < this.rowCount; row++) {
        if (this.bricks[column][row].status == 1) {
          const brick = this.bricks[column][row];
          brick.draw();
        }
      }
    }
  }
}
