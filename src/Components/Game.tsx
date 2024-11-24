import '../styles/Game.css'
import SelectedWaypointContextProvider from "../Context/SelectedWaypointContext";
import { useEffect, useState } from "react";
import { GetSystemFromWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import { GetDataList } from "../Helpers/ApiRequests";
import { useAgentContext } from "../Context/AgentContext";
import { useTokenContext } from "../Context/TokenContext";
import { StarmapInfo } from "../Types/StarmapInfo";
import Starmap from "./Starmap";
import StarMapDataContextProvider from "../Context/StarMapDataContext";
import MenuHolder from "./MenuHolder";
import useOpenCloseMenu from '../Hooks/useOpenCloseMenu';

export default function Game()
{
  const { agent } = useAgentContext();
  const { agentToken } = useTokenContext();

  const [ starmapInfo, setStarmapInfo ] = useState<StarmapInfo | undefined>(undefined);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [contextMenuHiddenClass, setIsContextMenuOpen] = useOpenCloseMenu();

  useEffect( () => 
  {
    if (!starmapInfo)
    {  LoadStarmapData();  }

    if(starmapInfo)
    { setIsLoaded(true); }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoaded, starmapInfo]);

  if (!isLoaded)
  {  return <span>Loading...</span>  }
  if(!starmapInfo)
  {  return <span>Error ocurred, please try again later...</span>  }


  return(
    <div id="mainGame">
      <SelectedWaypointContextProvider>
      <StarMapDataContextProvider starmapData={starmapInfo} setStarmapData={setStarmapInfo}>
        <Starmap starmapInfo={starmapInfo} setContextMenuIsOpen={setIsContextMenuOpen} />
        <MenuHolder contextMenuHiddenClass={contextMenuHiddenClass} setIsContextMenuOpen={setIsContextMenuOpen} />
      </StarMapDataContextProvider>
      </SelectedWaypointContextProvider>
    </div>
  )

  async function LoadStarmapData()
  {

    const systemSymbol = GetSystemFromWaypointSymbol(agent.headquarters);

    const waypointArrayData = await GetDataList(`/systems/${systemSymbol}/waypoints`);
    const shipArrayData = await GetDataList(`/my/ships`, agentToken);

    console.log("starmap data: ");
    console.log(shipArrayData);
    console.log(waypointArrayData);

    setStarmapInfo({...starmapInfo, waypointArray: waypointArrayData, shipArray: shipArrayData});

  } 
}
