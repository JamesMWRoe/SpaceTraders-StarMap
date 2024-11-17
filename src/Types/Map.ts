import Vec2 from "../Classes/Vector2";

export type Map = {
  centre: Vec2;
  mousePos: Vec2 | null;
  scale: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}
