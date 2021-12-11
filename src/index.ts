import { Ball } from "./ball";
import { Paddle } from "./paddle";
import { Bricks } from "./bricks";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ball: Ball;
  paddle: Paddle;
  bricks: Bricks;
  pause: boolean = false;
  score: number = 0;
  lives: number = 3;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 480;
    this.canvas.height = 720;
    this.ctx = this.canvas.getContext("2d")!;
    this.ball = new Ball(this.canvas, this.ctx);
    this.paddle = new Paddle(this.canvas, this.ctx);
    this.bricks = new Bricks(this.canvas, this.ctx);
    document.body.appendChild(this.canvas);
    this.draw();
  }

  wallCollisionDetection() {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (
        this.ball.x > this.paddle.x &&
        this.ball.x < this.paddle.x + this.paddle.width
      ) {
        this.ball.revertYDirection();
      } else {
        this.lives = this.lives - 1;
        console.warn(this.lives)
        if (!this.lives) {
          this.pause = true;
          alert("GAME OVER");
          document.location.reload();
        } else {
          this.paddle.setInitialPosition()
          this.ball.setInitialPosition()
        }

      }
    }
  }

  brickCollisionDetection() {
    if (this.bricks.detectBallCollision(this.ball.x, this.ball.y)) {
      this.ball.revertYDirection();
      this.score = this.score + 1;
      if (this.score == this.bricks.rowCount * this.bricks.columnCount) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
      }
    }
  }

  drawScore() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText(`Score: ${this.score}`, 8, 20);
  }

  drawLives() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText(`❤️ ${this.lives}`, this.canvas.width-65, 20);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw();
    this.paddle.draw();
    this.bricks.draw();
    this.ball.setDirection();
    this.brickCollisionDetection();
    this.wallCollisionDetection();
    this.ball.calcNewPosition();
    this.paddle.calcNewPosition();
    this.drawScore();
    this.drawLives()
    if (!this.pause) {
      window.requestAnimationFrame(this.draw.bind(this));
    }
  }
}

new Game();
