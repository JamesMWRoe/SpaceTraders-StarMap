import { useCallback, useEffect, useRef, useState } from "react"
import '../Styles/Canvas.css'
import { StarmapInfo } from "../Types/StarmapInfo"
import { Vec2 } from "../Types/Vector2"
import { Waypoint } from "../Types/Waypoint"
import { DistanceBetweenVectors } from "../Helpers/VectorMath"
import { useSelectedWaypointContext } from "../Context/SelectedWaypointContext"

type CanvasProps = 
{
  starmapInfo: StarmapInfo
}

type CanvasClickable =
{
  canvasPosition: Vec2;
  associatedWaypoint: Waypoint;
}

export default function StarmapCanvas({starmapInfo}: CanvasProps)
{

  const {setSelectedWaypoint} = useSelectedWaypointContext();

  const [mousePos, setMousePos] = useState<Vec2 | null>(null);
  const [mapPosition, setMapPosition] = useState<Vec2> ({x: 0, y: 0});
  const [scale, setScale] = useState(10);
  const [onScreenWaypoints, setOnscreenWaypoints] = useState<Array<CanvasClickable>>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const waypointRadius = 8;

  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, starmapInfo: StarmapInfo) => 
  {
    setOnscreenWaypoints([]);
    starmapInfo.waypointArray.forEach(waypoint => 
    {
      
      if (Math.abs(scale*(waypoint.x-mapPosition.x)) < (canvas.width/2) && Math.abs(scale*(waypoint.y-mapPosition.y)) < (canvas.height/2 ))
      {
        const canvasPosition = {
          x: Math.floor(canvas.width/2 - scale*mapPosition.x + scale*waypoint.x),
          y: Math.floor(canvas.height/2 - scale*mapPosition.y + scale*waypoint.y)
        }

        ctx.beginPath();
        ctx.arc(canvasPosition.x, canvasPosition.y, waypointRadius, 0, Math.PI*2);
        ctx.fill();


        setOnscreenWaypoints(array =>[...array, {canvasPosition: canvasPosition, associatedWaypoint: waypoint}]);
      }
    })
  }, [mapPosition, scale]);

  useEffect(() => 
  {
    console.log('scale: ' + scale);

    const canvas = canvasRef.current;

    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#FFF';
    
    draw(canvas, context, starmapInfo);
    
  }, [draw, starmapInfo, mapPosition, scale]);

  
  const updateMapPos = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => 
  {
    e.preventDefault();

    if (!mousePos) return;

    let deltaX = (mousePos.x - e.clientX)/scale;
    let deltaY = (mousePos.y - e.clientY)/scale;

    if (Math.abs(mapPosition.x + deltaX) > 1000) deltaX = 0;
    if (Math.abs(mapPosition.y + deltaY) > 1000) deltaY = 0; 

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

    onScreenWaypoints.forEach(waypoint => {
      const coordsToCheckAgainst = { x: waypoint.canvasPosition.x, y: waypoint.canvasPosition.y }

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