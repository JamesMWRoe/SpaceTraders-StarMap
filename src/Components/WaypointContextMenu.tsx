import { useEffect, useState } from "react";
import { GetWaypointClassOfWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import '../styles/WaypointContextMenu.css'
import { useSelectedWaypointContext } from "../Context/SelectedWaypointContext";

export default function WaypointContextMenu()
{
  const {selectedWaypoint} = useSelectedWaypointContext();

  const [isHidden, setIsHidden] = useState('isHidden');

  useEffect(() => {
    if (!selectedWaypoint) return;

    setIsHidden('');
  }, [selectedWaypoint]);

  if (!selectedWaypoint) return <></>

  const DisplayShipyardButton = () =>
  {
    const isShipyard = selectedWaypoint.traits.some(trait => trait.symbol === 'SHIPYARD');

    if (!isShipyard) return <></>

    return <button id="contextGotoShipyard" className="contextNavButton" >Go to shipyard</button>
  }

  const DisplayMarketplaceButton = () =>
  {
    const isMarketplace = selectedWaypoint.traits.some(trait => trait.symbol === 'MARKETPLACE');

    if (!isMarketplace) return <></>

    return <button id="contextGoToMarketPlace" className="contextNavButton">Go to marketplace</button>
  }

  const hideContextMenu = () =>
  {
    setIsHidden('hiddenMenu')
  }

  return(
    <div id="contextMenu" className={isHidden}>
      <div id="contextHead">
        <h2 id="contextWaypointSymbol">Waypoint: {selectedWaypoint.type}-{GetWaypointClassOfWaypointSymbol(selectedWaypoint.symbol)}</h2>
        <button id="closeContextMenu" onClick={hideContextMenu}>X</button>
      </div>
      <div id="contextWaypointShops">
        {DisplayShipyardButton()}
        {DisplayMarketplaceButton()}
      </div>

    </div>
  );

  
}