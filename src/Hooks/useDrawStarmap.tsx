import { useEffect, useState } from "react";
import { StarmapInfo } from "../Types/StarmapInfo";
import { Map } from "../Types/Map";
import { Waypoint } from "../Types/Waypoint";
import { Ship } from "../Types/Ship";
import shipImageURL from "../Images/rocket.png"
import { GetCanvasPositionFromMapPosition, PointIsOnMap } from "../Helpers/MapHelperFunctions";
import Vec2 from "../Classes/Vector2";

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
    starmapInfo.waypointArray.forEach(waypoint => {  drawWaypoint(waypoint, starmapInfo.waypointArray, canvas, ctx)  });
    starmapInfo.shipArray.forEach(ship => {  drawShip(ship, canvas, ctx)  });
  }

  function drawWaypoint(waypoint: Waypoint, waypointArray: Array<Waypoint>, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)
  {  
    const waypointVec = new Vec2(waypoint.x, waypoint.y)
    if (!PointIsOnMap(waypointVec, map, canvas)) return;

    const waypointCentrePosition = GetCanvasPositionFromMapPosition(waypointVec, map, canvas);

    let waypointCanvasPosition = waypointCentrePosition;

    if (!waypoint.orbits)
    {
      ctx.beginPath();
      ctx.arc(waypointCentrePosition.x, waypointCentrePosition.y, waypointRadius, 0, Math.PI*2);
      ctx.fill();
    }
    else
    {
      const orbitingWaypoint = waypointArray.find(orbiting => orbiting.symbol == waypoint.orbits);
      const orbitIndex = orbitingWaypoint?.orbitals.findIndex(orbital => orbital.symbol == waypoint.symbol);

      if (orbitIndex == undefined) return new Error('orbit index does not exist');

      console.log('waypoint orbits another waypoint');
      console.log('Orbit Index: ' + orbitIndex);

      const orbitLength = orbitIndex + 2;
      const waypointOrbitOffset = new Vec2(orbitLength * 20 * Math.cos(orbitAngle), orbitLength* 20 * Math.sin(orbitAngle));

      ctx.save()
      ctx.translate(waypointCentrePosition.x, waypointCentrePosition.y);
      ctx.beginPath();
      ctx.arc(0, 0, orbitLength * 20, 0, Math.PI*2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(waypointOrbitOffset.x, waypointOrbitOffset.y, waypointRadius, 0, 2*Math.PI)
      ctx.fill();
      ctx.restore();


      waypointCanvasPosition = waypointCentrePosition.add(waypointOrbitOffset);
    }

    setDrawnStarmapData(array =>[...array, {canvasPosition: waypointCanvasPosition, associatedWaypoint: waypoint}]);
    
  }

  function drawShip(ship: Ship, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D)
  {

    const shipImage = new Image();
    shipImage.src = shipImageURL;

    switch(ship.nav.status)
    {
      case "IN_ORBIT":
      {
        const orbitVec = new Vec2(ship.nav.route.destination.x, ship.nav.route.destination.y)
        if(!PointIsOnMap(orbitVec, map, canvas)) return;

        console.log("drawing orbiting ship");
        
        const waypointCanvasPos = GetCanvasPositionFromMapPosition(orbitVec, map, canvas);

        const shipCanvasPos = 
        {
          x: Math.floor(waypointCanvasPos.x -14),
          y: Math.floor(waypointCanvasPos.y -25) 
        }

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
          
        return;
      }
      case "IN_TRANSIT":
      {
        const destination = new Vec2(ship.nav.route.destination.x, ship.nav.route.destination.y);
        const origin = new Vec2(ship.nav.route.origin.x, ship.nav.route.origin.y);

        const totalTravelTime = Number(ship.nav.route.arrival) - Number(ship.nav.route.departureTime);
        const ElapsedTime = Number(Date()) - Number(ship.nav.route.departureTime);

        const percentTraveled = (ElapsedTime/totalTravelTime);
        const totalTravelVector = destination.add(origin.negative());
        const currentTravelVector = totalTravelVector.multiply(percentTraveled);

        const shipVector = origin.add(currentTravelVector);

        if(!PointIsOnMap(shipVector, map, canvas)) return;

        shipImage.onload = () =>
        {
          ctx.save()

        }

        return;
      }
      case "DOCKED":
      {
        const dockVec = new Vec2(ship.nav.route.destination.x, ship.nav.route.destination.y);
        if(!PointIsOnMap(dockVec, map, canvas)) return;
        
        console.log("drawing docked ship");
        
        const waypointCanvasPos = GetCanvasPositionFromMapPosition(dockVec, map, canvas);

        const shipCanvasPos = 
        {
          x: Math.floor(waypointCanvasPos.x + 20*Math.cos(orbitAngle)),
          y: Math.floor(waypointCanvasPos.y + 20*Math.sin(orbitAngle)) 
        }

        
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
          
        return;
      }
    }
  }
}


