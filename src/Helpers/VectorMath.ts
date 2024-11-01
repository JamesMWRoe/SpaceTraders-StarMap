import { Vec2 } from "../Types/Vector2";

export function DistanceBetweenVectors(a: Vec2, b: Vec2): number
{
  const xComponent = (a.x - b.x)*(a.x - b.x);
  const yComponent = (a.y - b.y)*(a.y - b.y);

  return Math.sqrt(xComponent + yComponent);
}