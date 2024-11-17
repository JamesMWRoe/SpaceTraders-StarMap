export type Waypoint =
{
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: Array<Orbital>;
  orbits: string;
  traits: Array<Traits>;
}

type Orbital =
{
  symbol: string;
}

type Traits = 
{
  symbol: string;
  name: string;
  description: string;
}
