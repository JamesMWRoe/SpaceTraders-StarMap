export type Waypoint =
{
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
  traits: Array<Traits>;
}

type Traits = 
{
  symbol: string;
  name: string;
  description: string;
}