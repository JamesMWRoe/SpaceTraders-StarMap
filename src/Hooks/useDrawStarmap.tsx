import { useEffect, useState } from "react";
import { StarmapInfo } from "../Types/StarmapInfo";
import { Vec2 } from "../Types/Vector2";
import { Waypoint } from "../Types/Waypoint";
import { Ship } from "../Types/Ship";
import shipImageURL from "../Images/rocket.png"

type Map = {
  centre: Vec2;
  mousePos: Vec2 | null;
  scale: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

type useDrawStarmapProps =
{
  map: Map;
  starmapData: StarmapInfo
}

type CanvasClickable =
{
  canvasPosition: Vec2;
  associatedWaypoint: Waypoint;
}

export default function useDrawStarmap({map, starmapData}: useDrawStarmapProps)
{
  const [drawnStarmapData, setDrawnStarmapData] = useState<Array<CanvasClickable>>([]);

  const orbitAngle = -Math.PI/4;
  const waypointRadius = 8;

  useEffect(() => 
    {
      console.log('scale: ' + map.scale);
  
      const canvas = map.canvasRef.current;
  
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;
  
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;
  
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = '#FFF';
      context.strokeStyle = '#FFF';
  
      draw(canvas, context, starmapData);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [starmapData, map.centre, map.scale]);

  return drawnStarmapData

  function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, starmapInfo: StarmapInfo)
  {
    setDrawnStarmapData([]);

    console.log(starmapInfo.shipArray);
    starmapInfo.waypointArray.forEach(waypoint => {drawWaypoint(waypoint, canvas, ctx)});
    starmapInfo.shipArray.forEach(ship => {drawShip(ship, canvas, ctx)});
  }

  function drawWaypoint(waypoint: Waypoint, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)
  {  
    if (Math.abs(map.scale*(waypoint.x-map.centre.x)) < (canvas.width/2) && Math.abs(map.scale*(waypoint.y-map.centre.y)) < (canvas.height/2 ))
    {
      const waypointCanvasPosition = {
        x: Math.floor(canvas.width/2 - map.scale*map.centre.x + map.scale*waypoint.x),
        y: Math.floor(canvas.height/2 - map.scale*map.centre.y + map.scale*waypoint.y)
      }

      ctx.beginPath();
      ctx.arc(waypointCanvasPosition.x, waypointCanvasPosition.y, waypointRadius, 0, Math.PI*2);
      ctx.fill();


      setDrawnStarmapData(array =>[...array, {canvasPosition: waypointCanvasPosition, associatedWaypoint: waypoint}]);
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
        if(Math.abs(map.scale*(orbitingWaypoint.x-map.centre.x)) < (canvas.width/2) && Math.abs(map.scale*(orbitingWaypoint.y-map.centre.y)) < (canvas.height/2))
        {
          console.log("drawing docked ship");
          
          const waypointCanvasPos = {
            x: Math.floor(canvas.width/2 - map.scale*map.centre.x + map.scale*orbitingWaypoint.x),
            y: Math.floor(canvas.height/2 - map.scale*map.centre.y + map.scale*orbitingWaypoint.y)
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
        if(Math.abs(map.scale*(orbitingWaypoint.x-map.centre.x)) < (canvas.width/2) && Math.abs(map.scale*(orbitingWaypoint.y-map.centre.y)) < (canvas.height/2))
        {
          console.log("drawing docked ship");
          
          const waypointCanvasPos = {
            x: Math.floor(canvas.width/2 - map.scale*map.centre.x + map.scale*orbitingWaypoint.x),
            y: Math.floor(canvas.height/2 - map.scale*map.centre.y + map.scale*orbitingWaypoint.y)
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


