import React, { useState } from "react";
import ShipyardMenu from "./ShipyardMenu";
import WaypointContextMenu from "./WaypointContextMenu";
import { Shipyard } from "../Types/Shipyard";
import { Market } from "../Types/Market";
import useOpenCloseMenu from "../Hooks/useOpenCloseMenu";

type ContextualMenusProps =
{
 contextMenuHiddenClass: "hiddenMenu" | "";
 setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContextualMenus({contextMenuHiddenClass, setIsContextMenuOpen}: ContextualMenusProps)
{

  const [shipyard, setShipyard] = useState<Shipyard | null>(null);
  const [market, setMarket] = useState<Market | null>(null);

  const [shipyardHiddenClass, setShipyardIsOpen] = useOpenCloseMenu();
  const [marketHiddenClass, setMarketIsOpen] = useOpenCloseMenu();

  return(
    <div id="contextualMenus">
      <WaypointContextMenu setShipyard={setShipyard} setMarket={setMarket} setShipyardIsOpen={setShipyardIsOpen} hiddenClass={contextMenuHiddenClass} setMarketIsOpen={setMarketIsOpen} setIsOpen={setIsContextMenuOpen}  />
      <ShipyardMenu hiddenClass={shipyardHiddenClass} shipyard={shipyard} setShipyardIsOpen={setShipyardIsOpen} />
    </div>
  )
}
