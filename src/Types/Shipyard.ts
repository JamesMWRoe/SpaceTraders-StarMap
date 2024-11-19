export type Shipyard =
{
  symbol: string;
  shipTypes: Array<ShipTypesForSale>;
  ships: Array<ShipForSale>;
}

type ShipTypesForSale =
{
  type: string;
}

export type ShipForSale =
{
  type: string;
  description: string;
  purchasePrice: string;

}
