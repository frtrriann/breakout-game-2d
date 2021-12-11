interface GameObjectInterface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  draw: () => void;
}

interface MovableGameObjectInterface extends GameObjectInterface {
  dx: number;
  dy?: number;
  calcNewPosition: () => void;
}
