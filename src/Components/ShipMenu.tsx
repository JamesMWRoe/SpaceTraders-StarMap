import { useEffect, useState } from "react";
import { GetDataList } from "../Helpers/ApiRequests";
import { useTokenContext } from "../Context/TokenContext";
import { Ship } from "../Types/Ship";
import ShipItem from "./ShipItem";

type ShipMenuProps =
{
  shipMenuHiddenClass: 'hiddenMenu' | '';
  setIsShipMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShipMenu({shipMenuHiddenClass, setIsShipMenuOpen}: ShipMenuProps)
{
  const [shipList, setShipList] = useState<Array<Ship> | null>(null);

  const {agentToken} = useTokenContext();

  useEffect(() => {
    let ignore = false;

    const fetchShipList = async () => 
    {
      const shipArray = await GetDataList('/my/ships', agentToken);
      if (!ignore) setShipList(shipArray);
    }
    
    fetchShipList();

    return () => {  ignore = true;  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!shipList) return ( <p className="loading">Loading Ships...</p> );

  return(
  <div id="fleetMenu" className={`menu ${shipMenuHiddenClass}`}>
    <div id="fleetMenuHead">
      <h2 id="fleetMenuHeader">Your Fleet</h2>
      <button onClick={() => {setIsShipMenuOpen(false)}}>X</button>
    </div>
    
    <ul id="shipList">
      {shipList.map(shipItem => <ShipItem ship={shipItem} />)}
    </ul>
  </div>
  )
}
