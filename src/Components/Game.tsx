import { useAgentContext } from "../Context/AgentContext"
import StarMap from "./StarMap";
import WaypointContextMenu from "./WaypointContextMenu";
import '../styles/Game.css'

export default function Game()
{
  const { agent } = useAgentContext();

  return(
    <div id="mainGame">

      <StarMap />
      <WaypointContextMenu />
    </div>
    
  )
}