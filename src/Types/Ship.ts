export type Ship = 
{
  symbol: string;
  registration: Registration;
  nav: Nav;
  cargo: Cargo;
  fuel: Fuel;
}

type Registration = 
{
  name: string;
  factionSymbol: string;
  role: string;
}

type Nav =
{
  waypointSymbol: string;
}

type Cargo = 
{
  capacity: number;
  units: number;
  inventory: Array<CargoItem>;
}

type Fuel = 
{
  current: number;
  capacity: number;
  consumed: 
  {
    amount: number;
    timestamp: string;
  }
}

type CargoItem =
{
  symbol: string;
  name: string;
  description: string;
  units: number;
}