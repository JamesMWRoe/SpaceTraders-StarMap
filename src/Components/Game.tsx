import { useAgentContext } from "../Context/AgentContext"
import ContractMenu from "./ContractMenu";
import ShipMenu from "./ShipMenu";

export default function Game()
{

  const { agent } = useAgentContext();

  return(
    <div id="mainGame">
      <h1>Main Game</h1>
      
      <ShipMenu />

    </div>
    
  )
}