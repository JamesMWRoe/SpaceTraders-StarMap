import { useCallback, useEffect, useRef, useState } from "react"
import '../Styles/Canvas.css'
import { StarmapInfo } from "../Types/StarmapInfo"
import { Vec2 } from "../Types/Vector2"

type CanvasProps = 
{
  starmapInfo: StarmapInfo
}

export default function Canvas({starmapInfo}: CanvasProps)
{
  const [mousePos, setMousePos] = useState<Vec2 | null>(null);
  const [mapPosition, setMapPosition] = useState<Vec2> ({x: 0, y: 0});
  const [scale, setScale] = useState(10);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, starmapInfo: StarmapInfo) => 
  {
    starmapInfo.waypointArray.forEach(waypoint => 
    {
      
      if (Math.abs(scale*(waypoint.x-mapPosition.x)) < (canvas.width/2) && Math.abs(scale*(waypoint.y-mapPosition.y)) < (canvas.height/2 ))
      {
        const canvasPosition = {
          x: canvas.width/2 - scale*mapPosition.x + scale*waypoint.x,
          y: canvas.height/2 - scale*mapPosition.y + scale*waypoint.y
        }

        ctx.beginPath();
        ctx.arc(canvasPosition.x, canvasPosition.y, 8, 0, Math.PI*2);
        ctx.fill();
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
    e.preventDefault();

    const zoomFactor = -0.01;
    let newScale = scale + e.deltaY*zoomFactor;

    newScale = Math.min(newScale, 20);
    newScale = Math.max(newScale, 1);

    setScale(newScale);
  }

  return (
    <canvas id="starmapCanvas" ref={canvasRef} onMouseMove={updateMapPos} onMouseDown={updateClickPos} onMouseUp={resetClickPos} onWheel={updateScale} />
  )
}