import { useCallback, useEffect, useState } from "react";
import { StarmapInfo } from "../Types/StarmapInfo";
import { useAgentContext } from "../Context/AgentContext";
import { GetSystemFromWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import StarmapCanvas from "./StarmapCanvas";

export default function StarMap()
{
  const [ starmapInfo, setStarmapInfo ] = useState<StarmapInfo | undefined>(undefined);
  const [ isLoaded, setIsLoaded ] = useState(false);

  const { agent } = useAgentContext();

  const LoadStarmap = useCallback(loadStarmap, [agent.headquarters, starmapInfo]);

  useEffect( () => {
    if (!starmapInfo)
    {  LoadStarmap();  }

    if(starmapInfo)
    { setIsLoaded(true); }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoaded, starmapInfo]);

  if (!isLoaded)
  {  return <span>Loading...</span>  }
  if(!starmapInfo)
  {  return <span>Error ocurred, please try again later...</span>  }

  return (
    <>
      <StarmapCanvas starmapInfo={starmapInfo} />
    </>
  )

  async function loadStarmap()
  {

    const systemSymbol = GetSystemFromWaypointSymbol(agent.headquarters);

    const resp = await fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=1`, {
      headers: {  Accept: "application/json"  }
    });

    const json = await resp.json();
    const numberOfWaypoints = json.meta.total;

    const numberOfPages = Math.ceil(numberOfWaypoints/20);

    const pagePromiseArray = [];

    for(let i=1; i<=numberOfPages; i++)
    {
      const pageResp = fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=20&page=${i}`, {
        headers: {  Accept: "application/json"  }
      });

      pagePromiseArray.push(pageResp);

    }

    const pageData = await Promise.all(pagePromiseArray);

    const pageJson = await Promise.all(pageData.map( resp => resp.json()));

    const data = pageJson.reduce((arr, json) => {
      return arr.concat(json.data);
    }, []);

    setStarmapInfo({...starmapInfo, waypointArray: data});

  } 

  
}