import { useCallback, useEffect, useRef, useState } from "react"
import '../Styles/Canvas.css'
import { StarmapInfo } from "../Types/StarmapInfo"
import { Vec2 } from "../Types/Vector2"
import { Waypoint } from "../Types/Waypoint"
import { DistanceBetweenVectors } from "../Helpers/VectorMath"
import { useSelectedWaypointContext } from "../Context/SelectedWaypointContext"
import { Ship } from "../Types/Ship"
import shipImageURL from "../Images/rocket.png"

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
  const orbitAngle = -Math.PI/4;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const waypointRadius = 8;

  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, starmapInfo: StarmapInfo) => 
  {
    setOnscreenWaypoints([]);

    console.log(starmapInfo.shipArray);
    starmapInfo.waypointArray.forEach(waypoint => {drawWaypoint(waypoint, canvas, ctx)});
    starmapInfo.shipArray.forEach(ship => {drawShip(ship, canvas, ctx)});

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    context.strokeStyle = '#FFF';


    console.log(starmapInfo.waypointArray);
    draw(canvas, context, starmapInfo);
    
  }, [draw, starmapInfo, mapPosition, scale]);

  
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
    onScreenWaypoints.forEach(waypoint => {
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

  function drawWaypoint(waypoint: Waypoint, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)
  {  
    if (Math.abs(scale*(waypoint.x-mapPosition.x)) < (canvas.width/2) && Math.abs(scale*(waypoint.y-mapPosition.y)) < (canvas.height/2 ))
    {
      const waypointCanvasPosition = {
        x: Math.floor(canvas.width/2 - scale*mapPosition.x + scale*waypoint.x),
        y: Math.floor(canvas.height/2 - scale*mapPosition.y + scale*waypoint.y)
      }

      ctx.beginPath();
      ctx.arc(waypointCanvasPosition.x, waypointCanvasPosition.y, waypointRadius, 0, Math.PI*2);
      ctx.fill();


      setOnscreenWaypoints(array =>[...array, {canvasPosition: waypointCanvasPosition, associatedWaypoint: waypoint}]);
    }
  }

  function drawShip(ship: Ship, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)
  {

    switch(ship.nav.status)
    {
      case "IN_ORBIT":
      {
        console.log("ship docked");
        console.log(ship.nav);
        const orbitingWaypoint = ship.nav.route.destination;
        if(Math.abs(scale*(orbitingWaypoint.x-mapPosition.x)) < (canvas.width/2) && Math.abs(scale*(orbitingWaypoint.y-mapPosition.y)) < (canvas.height/2))
        {
          console.log("drawing docked ship");
          
          const waypointCanvasPos = {
            x: Math.floor(canvas.width/2 - scale*mapPosition.x + scale*orbitingWaypoint.x),
            y: Math.floor(canvas.height/2 - scale*mapPosition.y + scale*orbitingWaypoint.y)
          }

          const shipCanvasPos = {
            x: Math.floor(waypointCanvasPos.x -14),
            y: Math.floor(waypointCanvasPos.y -25) 
          }
          const shipImage = new Image();
          shipImage.src = shipImageURL;
          
          shipImage.onload = () => 
          {  
            ctx.save();
            console.log('drawing ship')
            console.log(ship);
            console.log(shipCanvasPos);
            ctx.translate(shipCanvasPos.x, shipCanvasPos.y);
            ctx.rotate((-45/360)*2*Math.PI);

            ctx.drawImage(shipImage, 0, 0, 20, 20);
            ctx.restore();
          }
          
        }
        return;
      }
      case "IN_TRANSIT":
      case "DOCKED":
      {
        console.log("ship docked");
        console.log(ship.nav);
        const orbitingWaypoint = ship.nav.route.destination;
        if(Math.abs(scale*(orbitingWaypoint.x-mapPosition.x)) < (canvas.width/2) && Math.abs(scale*(orbitingWaypoint.y-mapPosition.y)) < (canvas.height/2))
        {
          console.log("drawing docked ship");
          
          const waypointCanvasPos = {
            x: Math.floor(canvas.width/2 - scale*mapPosition.x + scale*orbitingWaypoint.x),
            y: Math.floor(canvas.height/2 - scale*mapPosition.y + scale*orbitingWaypoint.y)
          }

          const shipCanvasPos = {
            x: Math.floor(waypointCanvasPos.x + 20*Math.cos(orbitAngle)),
            y: Math.floor(waypointCanvasPos.y + 20*Math.sin(orbitAngle)) 
          }
          const shipImage = new Image();
          shipImage.src = shipImageURL;
          
          shipImage.onload = () => 
          {  
            ctx.save();
            console.log('drawing ship')
            console.log(ship);
            console.log(shipCanvasPos);
            ctx.translate(shipCanvasPos.x, shipCanvasPos.y);
            ctx.rotate(((-45/360)*2*Math.PI) - orbitAngle);

            ctx.drawImage(shipImage, 0, 0, 20, 20);
            ctx.restore();
          }
          
        }
        return;
      }

    }


  }
}
