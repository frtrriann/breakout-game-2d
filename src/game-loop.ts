export class GameLoop {
  update;
  draw;
  paused: boolean = true;
  constructor(update: any, draw: any) {
    this.update = update;
    this.draw = draw;
    this.run = this.run.bind(this);
  }

  private run() {
    if (this.paused) return;
    requestAnimationFrame(this.run);
    this.update();
    this.draw();
  }

  play() {
    if (this.paused) {
      this.paused = false;
      this.run();
    }
  }

  pause() {
    this.paused = true;
  }
}
