import { Ball } from "./ball";
import { Paddle } from "./paddle";
import { Bricks } from "./bricks";
import { GameLoop } from "./game-loop";
import { Score } from "./score";
import { Lives } from "./lives";

class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  ball: Ball;
  paddle: Paddle;
  bricks: Bricks;
  score: Score;
  game: GameLoop
  lives: Lives;
  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 480;
    this.canvas.height = 720;
    this.ctx = this.canvas.getContext("2d")!;
    this.ball = new Ball(this.canvas, this.ctx);
    this.paddle = new Paddle(this.canvas, this.ctx);
    this.bricks = new Bricks(this.canvas, this.ctx);
    this.score = new Score(this.canvas, this.ctx)
    this.lives = new Lives(this.canvas, this.ctx)
    document.body.appendChild(this.canvas);
    this.game = new GameLoop(this.update.bind(this), this.draw.bind(this));
    this.game.play()
  }

  wallCollisionDetection() {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (
        this.ball.x > this.paddle.x &&
        this.ball.x < this.paddle.x + this.paddle.width
      ) {
        this.ball.revertYDirection();
      } else {
        this.lives.decreaseLives()
        if (!this.lives.value) {
          this.game.pause();
          alert("GAME OVER");
          document.location.reload();
        } else {
          this.paddle.setInitialPosition();
          this.ball.setInitialPosition();
        }
      }
    }
  }

  brickCollisionDetection() {
    if (this.bricks.detectBallCollision(this.ball.x, this.ball.y)) {
      this.ball.revertYDirection();
      this.score.increaseScore();
      if (this.score.score == this.bricks.rowCount * this.bricks.columnCount) {
        alert("YOU WIN, CONGRATULATIONS!");
        document.location.reload();
      }
    }
  }


  update() {
    this.ball.setDirection();
    this.brickCollisionDetection();
    this.wallCollisionDetection();
    this.ball.calcNewPosition();
    this.paddle.calcNewPosition();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw();
    this.paddle.draw();
    this.bricks.draw();
    this.score.draw();
    this.lives.draw();
  }
}

new Game();
