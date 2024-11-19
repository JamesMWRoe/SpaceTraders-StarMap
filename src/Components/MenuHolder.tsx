import { useState } from "react";
import ShipyardMenu from "./ShipyardMenu";
import WaypointContextMenu from "./WaypointContextMenu";
import { Shipyard } from "../Types/Shipyard";
import { Market } from "../Types/Market";
import "../Styles/Menu.css"

export default function MenuHolder()
{
  const [shipyard, setShipyard] = useState<Shipyard | null>(null);
  const [market, setMarket] = useState<Market | null>(null);


  return(
  <div id="menuHolder">

    <WaypointContextMenu setShipyard={setShipyard} setMarket={setMarket} />
    <ShipyardMenu shipyard={shipyard} setShipyard={setShipyard} />
  </div>
  )
}
