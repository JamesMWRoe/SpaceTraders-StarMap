import { useRef, useState } from "react"
import '../Styles/Canvas.css'
import { StarmapInfo } from "../Types/StarmapInfo"
import Vec2 from "../Classes/Vector2"
import { useSelectedWaypointContext } from "../Context/SelectedWaypointContext"
import useDrawStarmap from "../Hooks/useDrawStarmap"

type CanvasProps = 
{
  starmapInfo: StarmapInfo;
  setContextMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Starmap({starmapInfo, setContextMenuIsOpen}: CanvasProps)
{
  const {setSelectedWaypoint} = useSelectedWaypointContext();

  const [mousePos, setMousePos] = useState<Vec2 | null>(null);
  const [mapPosition, setMapPosition] = useState<Vec2> (new Vec2(0, 0));
  const [scale, setScale] = useState(10);
  const waypointRadius = 8;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawnStarmapData = useDrawStarmap({map: {centre: mapPosition, mousePos: mousePos, scale: scale, canvasRef: canvasRef}, starmapData: starmapInfo})
  
  
  return (
    <canvas id="starmapCanvas" ref={canvasRef} 
      onClick={getWaypoint} 
      onMouseMove={updateMapPos} 
      onMouseDown={updateClickPos} 
      onMouseUp={resetClickPos} 
      onWheel={updateScale}
    />
  );

  function getWaypoint(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>)
  {
    // get mouse position in map coords
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const canvasClickCoords = new Vec2(e.clientX, e.clientY);
    console.log('clicked on:');
    console.log(canvasClickCoords);

    console.log('checking against:');
    drawnStarmapData.forEach(waypoint => {
      const coordsToCheckAgainst = new Vec2(waypoint.canvasPosition.x, waypoint.canvasPosition.y);
      console.log(coordsToCheckAgainst);

      if (canvasClickCoords.DistanceTo(coordsToCheckAgainst) < waypointRadius)
      {
        console.log(waypoint.associatedWaypoint);
        setSelectedWaypoint(waypoint.associatedWaypoint);
        setContextMenuIsOpen(true);
      }
    });
  }

  function updateMapPos(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) 
  {
    e.preventDefault();

    if (!mousePos) return;

    let deltaX = (mousePos.x - e.clientX)/scale;
    let deltaY = (mousePos.y - e.clientY)/scale;

    if (Math.abs(mapPosition.x + deltaX) > 500) deltaX = 0;
    if (Math.abs(mapPosition.y + deltaY) > 500) deltaY = 0; 

    setMapPosition(new Vec2(mapPosition.x + deltaX, mapPosition.y + deltaY));

    setMousePos(new Vec2(e.clientX, e.clientY));
  }

  function updateClickPos(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>)
  {
    setMousePos(new Vec2(e.clientX, e.clientY));
  }

  function resetClickPos()
  {
    setMousePos(null);
  }

  function updateScale(e: React.WheelEvent<HTMLCanvasElement>)
  {
    const zoomFactor = -0.01;
    let newScale = scale + e.deltaY*zoomFactor;

    newScale = Math.min(newScale, 20);
    newScale = Math.max(newScale, 1);

    setScale(newScale);
  }
}
