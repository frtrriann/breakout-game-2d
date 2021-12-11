export class Ball implements MovableGameObjectInterface {
  canvas;
  ctx;
  x = 0;
  y = 0;
  dx = 0;
  dy = 0;
  radius: number = 10;
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.setInitialPosition();
  }

  setInitialPosition() {
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 30;
    this.dx = 2;
    this.dy = -2;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  setDirection() {
    if (
      this.x + this.dx > this.canvas.width - this.radius ||
      this.x + this.dx < this.radius
    ) {
      this.revertXDirection();
    }
    if (this.y + this.dy < this.radius) {
      this.revertYDirection();
    }
  }

  calcNewPosition() {
    this.x += this.dx;
    this.y += this.dy;
  }

  revertXDirection() {
    this.dx = -this.dx;
  }

  revertYDirection() {
    this.dy = -this.dy;
  }
}
