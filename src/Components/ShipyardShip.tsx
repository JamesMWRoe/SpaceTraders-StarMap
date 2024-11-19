import { ShipForSale } from "../Types/Shipyard";

type ShipyardShipProps =
{
  ship: ShipForSale;
}

export default function ShipyardShip({ship}: ShipyardShipProps)
{
  return(
    <li className="shipForSale">
      <div className="shipHead">
        <p className="shipType">ship type: {ship.type}</p>
      </div>
      <div className="shipMain">
        <p className="shipDescription">{ship.description}</p>
        <div className="tradeSection">
          <span className="shipPrice">{ship.purchasePrice} Cr</span>
          <button className="buy" disabled={false} >Purchase Ship</button>
        </div>
      </div>
    </li>
  )

  async function AttemptPurchase()
  {

  }
}
