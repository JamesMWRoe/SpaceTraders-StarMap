import { useState } from "react";
import { dummyWaypoint } from "../Helpers/DummyWaypoint";
import { GetWaypointClassOfWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import '../styles/WaypointContextMenu.css'

export default function WaypointContextMenu()
{
  const currentWaypoint = dummyWaypoint;

  const [isHidden, setIsHidden] = useState('');

  if (!currentWaypoint) return <p>Not yet implemented</p>

  const DisplayShipyardButton = () =>
  {
    const isShipyard = currentWaypoint.traits.some(trait => trait.symbol === 'SHIPYARD');

    if (!isShipyard) return <></>

    return <button id="contextGotoShipyard" className="contextNavButton" >Go to shipyard</button>
  }

  const DisplayMarketplaceButton = () =>
  {
    const isMarketplace = currentWaypoint.traits.some(trait => trait.symbol === 'MARKETPLACE');

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
        <h2 id="contextWaypointSymbol">Waypoint: {currentWaypoint.type}-{GetWaypointClassOfWaypointSymbol(currentWaypoint.symbol)}</h2>
        <button id="closeContextMenu" onClick={hideContextMenu}>X</button>
      </div>
      <div id="contextWaypointShops">
        {DisplayShipyardButton()}
        {DisplayMarketplaceButton()}
      </div>

    </div>
  );

  
}