<<<<<<< HEAD
import { useAgentContext } from "../Context/AgentContext"
import ContractMenu from "./ContractMenu";
import ShipMenu from "./ShipMenu";
=======
import StarMap from "./StarMap";
import WaypointContextMenu from "./WaypointContextMenu";
import '../styles/Game.css'
import SelectedWaypointContextProvider from "../Context/SelectedWaypointContext";
>>>>>>> master

export default function Game()
{
  return(
    <div id="mainGame">
<<<<<<< HEAD
      <h1>Main Game</h1>
      
      <ShipMenu />

=======
      <SelectedWaypointContextProvider>
        <StarMap />
        <WaypointContextMenu />
      </SelectedWaypointContextProvider>
>>>>>>> master
    </div>
  )
}