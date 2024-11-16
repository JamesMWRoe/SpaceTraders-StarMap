import { Ship } from "./Ship";
import { Waypoint } from "./Waypoint"

export type StarmapInfo =
{
  waypointArray: Array<Waypoint>;
  shipArray: Array<Ship>;
}
