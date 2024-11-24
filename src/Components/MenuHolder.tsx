import { useState } from "react";
import ShipyardMenu from "./ShipyardMenu";
import WaypointContextMenu from "./WaypointContextMenu";
import { Shipyard } from "../Types/Shipyard";
import { Market } from "../Types/Market";
import "../Styles/Menu.css"
import useOpenCloseMenu from "../Hooks/useOpenCloseMenu";

type MenuHolderProps = 
{
  contextMenuHiddenClass: 'hiddenMenu' | '';
  setContextMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuHolder({ contextMenuHiddenClass, setContextMenuIsOpen }: MenuHolderProps)
{
  const [shipyard, setShipyard] = useState<Shipyard | null>(null);
  const [market, setMarket] = useState<Market | null>(null);

  const { hiddenClass: shipyardHiddenClass, setIsOpen: setShipyardIsOpen} = useOpenCloseMenu();
  const { hiddenClass: marketHiddenClass, setIsOpen: setMarketIsOpen} = useOpenCloseMenu();

  return(
  <div id="menuHolder">
    <WaypointContextMenu setShipyard={setShipyard} setMarket={setMarket} setShipyardIsOpen={setShipyardIsOpen} hiddenClass={contextMenuHiddenClass} setMarketIsOpen={setMarketIsOpen} setIsOpen={setContextMenuIsOpen}  />
    <ShipyardMenu hiddenClass={shipyardHiddenClass} shipyard={shipyard} setShipyardIsOpen={setShipyardIsOpen} />
  </div>
  )
}
