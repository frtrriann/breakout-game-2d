import { ARROW_LEFT_KEY, ARROW_RIGHT_KEY } from "./constants";
import { createRoundRect } from "./helpers";

export class Paddle implements MovableGameObjectInterface {
  canvas;
  ctx;
  x = 0;
  y = 0;
  dx = 7;
  height: number = 15;
  width: number = 75;
  rightPressed: boolean = false;
  leftPressed: boolean = false;
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.setInitialPosition();
    document.addEventListener("keydown", this.keyDownHandler.bind(this), false);
    document.addEventListener("keyup", this.keyUpHandler.bind(this), false);
    document.addEventListener(
      "mousemove",
      this.mouseMoveHandler.bind(this),
      false
    );
  }

  setInitialPosition() {
    this.x = (this.canvas.width - this.width) / 2;
    this.y = this.canvas.height - this.height;
  }

  mouseMoveHandler(event: MouseEvent) {
    const relativeX = event.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      const centerMousePosition = relativeX - this.width / 2;
      this.x = Math.min(
        Math.max(0, centerMousePosition),
        this.canvas.width - this.width
      );
    }
  }

  keyDownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case ARROW_RIGHT_KEY: {
        this.rightPressed = true;
        break;
      }
      case ARROW_LEFT_KEY: {
        this.leftPressed = true;
        break;
      }
    }
  }

  keyUpHandler(event: KeyboardEvent) {
    switch (event.key) {
      case ARROW_RIGHT_KEY: {
        this.rightPressed = false;
        break;
      }
      case ARROW_LEFT_KEY: {
        this.leftPressed = false;
        break;
      }
    }
  }

  draw() {
    this.ctx.beginPath();
    createRoundRect(
      this.ctx,
      this.x,
      this.y,
      this.width,
      this.height,
      4
    );

    this.ctx.fillStyle = "#4b4b4b";
    this.ctx.fill();
    this.ctx.closePath();
  }

  calcNewPosition() {
    if (this.rightPressed && this.x < this.canvas.width - this.width) {
      this.x += this.dx;
    }
    if (this.leftPressed && this.x > 0) {
      this.x -= this.dx;
    }
  }
}
