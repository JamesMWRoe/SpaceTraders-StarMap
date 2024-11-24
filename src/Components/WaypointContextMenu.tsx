import { GetWaypointClassOfWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import { useSelectedWaypointContext } from "../Context/SelectedWaypointContext";
import { GetData } from "../Helpers/ApiRequests";
import { Shipyard } from "../Types/Shipyard";
import { useStarmapDataContext } from "../Context/StarMapDataContext";
import { Market } from "../Types/Market";
import { useTokenContext } from "../Context/TokenContext";
import { useEffect } from "react";

type WaypointContextMenuProps =
{
  hiddenClass: 'hiddenMenu' | '';
  
  setShipyard: React.Dispatch<React.SetStateAction<Shipyard | null>>;
  setMarket: React.Dispatch<React.SetStateAction<Market | null>>;

  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShipyardIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMarketIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WaypointContextMenu({ hiddenClass, setShipyard, setMarket, setIsOpen, setShipyardIsOpen, setMarketIsOpen }: WaypointContextMenuProps)
{
  const { selectedWaypoint } = useSelectedWaypointContext();
  const { starmapData } = useStarmapDataContext();
  const { agentToken } = useTokenContext();

  useEffect(() => {
    if(!selectedWaypoint) return;

    UpdateShipyard();
    UpdateMarket();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWaypoint]);

  if (!selectedWaypoint) return <></>

  const DisplayShipyardButton = () =>
  {
    const isShipyard = selectedWaypoint.traits.some(trait => trait.symbol === 'SHIPYARD');

    if (!isShipyard) return <></>

    return <button type="submit" id="contextGotoShipyard" className="contextNavButton" onClick={() => {setShipyardIsOpen(true)}} >Go to shipyard</button>
  }

  const DisplayMarketplaceButton = () =>
  {
    const isMarketplace = selectedWaypoint.traits.some(trait => trait.symbol === 'MARKETPLACE');

    if (!isMarketplace) return <></>

    return <button id="contextGoToMarketPlace" className="contextNavButton" onClick={() => {setMarketIsOpen(true)}}>Go to marketplace</button>
  }

  const DisplayRelatedShips = () =>
  {
    return starmapData.shipArray.map(ship => ship.nav.waypointSymbol===selectedWaypoint.symbol?<p>{ship.registration.name}</p>:<></>);
  }

  return(
    <div id="contextMenu" className={`menu ${hiddenClass}`}>
      <div className="menuHead">
        <h2 id="contextWaypointSymbol">Waypoint: {selectedWaypoint.type}-{GetWaypointClassOfWaypointSymbol(selectedWaypoint.symbol)}</h2>
        <button id="closeContextMenu" onClick={() => setIsOpen(false)}>X</button>
      </div>
      <div id="contextWaypointShops">
        {DisplayShipyardButton()}
        {DisplayMarketplaceButton()}
      </div>
      <div id="ships">
        {DisplayRelatedShips()}
      </div>

    </div>
  );

  async function UpdateShipyard()
  {
    if (!selectedWaypoint) return;
    
    const shipyardData = await GetData(`/systems/${selectedWaypoint.systemSymbol}/waypoints/${selectedWaypoint.symbol}/shipyard`, agentToken)

    setShipyard(shipyardData);
  }

  async function UpdateMarket()
  {
    if (!selectedWaypoint) return

    const marketData = await GetData(`/systems/${selectedWaypoint.systemSymbol}/waypoints/${selectedWaypoint.symbol}/market`, agentToken);

    setMarket(marketData);
  }

}
