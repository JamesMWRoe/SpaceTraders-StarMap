import { Ship } from "../Types/Ship";

type ShipListItemProps =
{
  ship: Ship
}

export default function ShipItem({ship: ship}: ShipListItemProps)
{
  return(
    <li className="shipItem">
      <p id="shipName">{ship.symbol}</p>
      <p id="shipRole">{ship.registration.role}</p>
      <p id="location">Waypoint: {ship.nav.waypointSymbol}</p>
    </li>

  )
}