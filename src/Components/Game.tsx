import { useAgentContext } from "../Context/AgentContext"
import StarMap from "./StarMap";

export default function Game()
{

  const { agent } = useAgentContext();

  return(
    <div id="mainGame">
      <h1>Main Game</h1>
      <p id="agentCallSign">Welcome: {agent.symbol}</p>
      <p id="agentCredits">Credits: {agent.credits}</p>

      <StarMap />

    </div>
    
  )
}