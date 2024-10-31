import { useEffect, useState } from "react";
import { GetDataList } from "../Helpers/ApiRequests";
import { useTokenContext } from "../Context/TokenContext";
import { Ship } from "../Types/Ship";
import ShipItem from "./ShipItem";

export default function ShipMenu()
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
  <>
    <h2 id="fleetMenuHeader">Your Fleet</h2>
    <ul id="shipList">
      {shipList.map(shipItem => <ShipItem ship={shipItem} />)}
    </ul>
  </>
  )
}