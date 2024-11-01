import StarMap from "./StarMap";
import WaypointContextMenu from "./WaypointContextMenu";
import '../styles/Game.css'
import SelectedWaypointContextProvider from "../Context/SelectedWaypointContext";

export default function Game()
{
  return(
    <div id="mainGame">
      <SelectedWaypointContextProvider>
        <StarMap />
        <WaypointContextMenu />
      </SelectedWaypointContextProvider>
    </div>
  )
}