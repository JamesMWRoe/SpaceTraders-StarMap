import { useStarmapDataContext } from "../Context/StarMapDataContext";
import { GetWaypointClassOfWaypointSymbol } from "../Helpers/WaypointSymbolParsers";
import { Shipyard } from "../Types/Shipyard";
import ShipyardShip from "./ShipyardShip";

type ShipyardMenuProps =
{
  hiddenClass: 'hiddenMenu' | '';
  shipyard: Shipyard | null;
  setShipyardIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShipyardMenu({ hiddenClass, shipyard, setShipyardIsOpen }: ShipyardMenuProps)
{
  const { starmapData } = useStarmapDataContext();

  if(!shipyard)
  {  return <></>  }

  console.log('shipyard: ');
  console.log(shipyard);


  return(
    <div id="shipyardMenu" className={`menu ${hiddenClass}`}>
      <div className="menuHead">
        <h2>Shipyard-{GetWaypointClassOfWaypointSymbol(shipyard.symbol)}</h2>
        <button onClick={CloseMenu}>X</button>
      </div>
      <div id="shipsForSale">
        {DisplayShipInfo()}
      </div>
    </div>
  )

  function CloseMenu()
  {  setShipyardIsOpen(false);  }

  function DisplayShipInfo()
  {
    if (!shipyard) return;

    const isShip = starmapData.shipArray.some(ship => ship.nav.waypointSymbol === shipyard.symbol);

    if (isShip)
    {  return DisplayShips();  }

    return DisplayShipTypes();
  }

  function DisplayShips()
  {
    if(!shipyard) return;

    return shipyard.ships.map(shipForSale => <ShipyardShip waypointSymbol={shipyard.symbol} ship={shipForSale} />);
  }

  function DisplayShipTypes()
  {
    if(!shipyard) return;

    const shipList = shipyard.shipTypes.map(shipForSale => <p>{shipForSale.type}</p>);

    return (
      <ul>
        {shipList}
      </ul>
    )
  }

}
