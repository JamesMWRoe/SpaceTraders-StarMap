import { useAgentContext } from "../Context/AgentContext"
import StarMap from "./StarMap";

export default function Game()
{
  const { agent } = useAgentContext();

  return(
    <div id="mainGame">

      <StarMap />

    </div>
    
  )
}