export default class Vec2
{
  x: number;
  y: number;

  constructor(x: number, y: number)
  {
    this.x = x;
    this.y = y;
  }

  add(vector: Vec2): Vec2
  {  return new Vec2(this.x + vector.x, this.y + vector.y);  }

  multiply(scalar: number): Vec2
  {  return new Vec2(scalar * this.x, scalar * this.y);  }

  negative(): Vec2
  {  return new Vec2(-this.x, -this.y);  }

  DistanceTo(vector: Vec2): number
  {
    const xComponent = (this.x - vector.x)*(this.x - vector.x);
    const yComponent = (this.y - vector.y)*(this.y - vector.y);

    return Math.sqrt(xComponent + yComponent);
  }
}
