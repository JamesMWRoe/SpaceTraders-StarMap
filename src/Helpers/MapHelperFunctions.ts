import Vec2 from '../Classes/Vector2'
import { Map } from '../Types/Map'

export function PointIsOnMap(point: Vec2, map: Map, canvas: HTMLCanvasElement): boolean
{
  if (Math.abs(map.scale*(point.x-map.centre.x)) < (canvas.width/2) && Math.abs(map.scale*(point.y-map.centre.y)) < (canvas.height/2 ))
  { return true; }

  return false;
}

export function GetCanvasPositionFromMapPosition(mapPosition: Vec2, map: Map, canvas: HTMLCanvasElement): Vec2
{
  return new Vec2(
    Math.floor(canvas.width/2 - map.scale*map.centre.x + map.scale*mapPosition.x),
    Math.floor(canvas.height/2 - map.scale*map.centre.y + map.scale*mapPosition.y)
  )
}
