export type Contract =
{
  id: string;
  factionSymbol: string;
  type: string;
  terms: Terms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  deadlineToAccept: string;
}

type Terms =
{
  deadline: string;
  payment: Payment;
  deliver: Array<DeliverGood>;
}

type Payment =
{
  onAccepted: number;
  onFulfilled: number;
}

type DeliverGood =
{
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}