import { useCallback, useEffect, useState } from "react";
import { StarmapInfo } from "../Types/StarmapInfo";
import { useAgentContext } from "../Context/AgentContext";
import { GetSystemFromWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import StarmapCanvas from "./StarmapCanvas";
import { GetDataList } from "../Helpers/ApiRequests";
import { useTokenContext } from "../Context/TokenContext";

export default function StarMap()
{
  const [ starmapInfo, setStarmapInfo ] = useState<StarmapInfo | undefined>(undefined);
  const [ isLoaded, setIsLoaded ] = useState(false);

  const { agentToken } = useTokenContext();
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

  async function loadStarmap() // replace with getlist functionality. also get ships... somehow
  {

    const systemSymbol = GetSystemFromWaypointSymbol(agent.headquarters);

    const waypointArrayData = await GetDataList(`/systems/${systemSymbol}/waypoints`);
    const shipArrayData = await GetDataList(`/my/ships`, agentToken);

    console.log(shipArrayData);

    setStarmapInfo({...starmapInfo, waypointArray: waypointArrayData, shipArray: shipArrayData});

  } 

  
}
