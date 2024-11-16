import ContractMenu from "./ContractMenu";
import ShipMenu from "./ShipMenu";
import SideMenu from "./SideMenu";
import WaypointContextMenu from "./WaypointContextMenu";

export default function MenuHolder()
{
  return(
  <div id="MenuHolder">
    <SideMenu />
    <ShipMenu />
    <ContractMenu />

    <WaypointContextMenu />
  </div>
  )
}