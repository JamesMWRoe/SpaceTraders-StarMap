import { useRef, useState } from "react"
import '../Styles/Canvas.css'
import { StarmapInfo } from "../Types/StarmapInfo"
import { Vec2 } from "../Types/Vector2"
import { DistanceBetweenVectors } from "../Helpers/VectorMath"
import { useSelectedWaypointContext } from "../Context/SelectedWaypointContext"
import useDrawStarmap from "../Hooks/useDrawStarmap"

type CanvasProps = 
{
  starmapInfo: StarmapInfo
}

export default function StarmapCanvas({starmapInfo}: CanvasProps)
{
  const {setSelectedWaypoint} = useSelectedWaypointContext();

  const [mousePos, setMousePos] = useState<Vec2 | null>(null);
  const [mapPosition, setMapPosition] = useState<Vec2> ({x: 0, y: 0});
  const [scale, setScale] = useState(10);
  const waypointRadius = 8;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnStarmapData = useDrawStarmap({map: {centre: mapPosition, mousePos: mousePos, scale: scale, canvasRef: canvasRef}, starmapData: starmapInfo})
  
  const updateMapPos = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => 
  {
    e.preventDefault();

    if (!mousePos) return;

    let deltaX = (mousePos.x - e.clientX)/scale;
    let deltaY = (mousePos.y - e.clientY)/scale;

    if (Math.abs(mapPosition.x + deltaX) > 500) deltaX = 0;
    if (Math.abs(mapPosition.y + deltaY) > 500) deltaY = 0; 

    setMapPosition({x: mapPosition.x + deltaX, y: mapPosition.y + deltaY});

    setMousePos({x: e.clientX, y: e.clientY});
  }

  const updateClickPos = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>
  {
    setMousePos({x: e.clientX, y: e.clientY});
  }

  const resetClickPos = () =>
  {
    setMousePos(null);
  }

  const updateScale = (e: React.WheelEvent<HTMLCanvasElement>) =>
  {

    const zoomFactor = -0.01;
    let newScale = scale + e.deltaY*zoomFactor;

    newScale = Math.min(newScale, 20);
    newScale = Math.max(newScale, 1);

    setScale(newScale);
  }

  const getWaypoint = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>
  {
    // get mouse position in map coords
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const canvasClickCoords = { x: e.clientX, y: e.clientY }
    console.log('clicked on:');
    console.log(canvasClickCoords);

    console.log('checking against:');
    drawnStarmapData.forEach(waypoint => {
      const coordsToCheckAgainst = { x: waypoint.canvasPosition.x, y: waypoint.canvasPosition.y }
      console.log(coordsToCheckAgainst);

      if (DistanceBetweenVectors(coordsToCheckAgainst, canvasClickCoords) < waypointRadius)
      {
        console.log(waypoint.associatedWaypoint);
        setSelectedWaypoint(waypoint.associatedWaypoint);
      }
    });
  }

  return (
    <canvas id="starmapCanvas" ref={canvasRef} 
      onClick={getWaypoint} 
      onMouseMove={updateMapPos} 
      onMouseDown={updateClickPos} 
      onMouseUp={resetClickPos} 
      onWheel={updateScale}
    />
  )



}
