
export  class Lives {
    canvas;
    ctx;
    private lives = 3
    constructor( canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.draw();

    }

    get value() {
        return this.lives
    }

    decreaseLives() {
        this.lives--;
        this.draw();
    }

    setToZero() {
        this.lives = 0;
        this.draw();
    }

    draw() {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#0095DD";
        this.ctx.fillText(`❤️ ${this.lives}`, this.canvas.width - 65, 20);
    }
    
}