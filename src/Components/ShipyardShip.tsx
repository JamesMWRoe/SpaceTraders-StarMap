import { useAgentContext } from "../Context/AgentContext";
import { useStarmapDataContext } from "../Context/StarMapDataContext";
import { useTokenContext } from "../Context/TokenContext";
import { PostData } from "../Helpers/ApiRequests";
import { ShipForSale } from "../Types/Shipyard";

type ShipyardShipProps =
{
  waypointSymbol: string;
  ship: ShipForSale;
}

export default function ShipyardShip({waypointSymbol, ship}: ShipyardShipProps)
{
  const { agent, setAgent } = useAgentContext();
  const { starmapData, setStarmapData } = useStarmapDataContext();
  const { agentToken } = useTokenContext();

  return(
    <li className="shipForSale">
      <div className="shipHead">
        <p className="shipType">ship type: {ship.type}</p>
      </div>
      <div className="shipMain">
        <p className="shipDescription">{ship.description}</p>
        <div className="tradeSection">
          <span className="shipPrice">{ship.purchasePrice} Cr</span>
          <button className="buy" disabled={ship.purchasePrice > agent.credits} onClick={AttemptPurchase} >Purchase Ship</button>
        </div>
      </div>
    </li>
  )

  async function AttemptPurchase()
  {
    const purchaseBody = {
      shipType: ship.type,
      waypointSymbol: waypointSymbol
    }

    console.log(purchaseBody);
    console.log(JSON.stringify(purchaseBody));

    const returnedData = await PostData('/my/ships', purchaseBody, agentToken);

    if (returnedData.respStatus == 201)
    {
      setAgent(returnedData.data.agent);
      setStarmapData({
        ...starmapData,
        shipArray: [...starmapData.shipArray, returnedData.data.ship]
      });
    }

    console.log(returnedData);

  }
}
