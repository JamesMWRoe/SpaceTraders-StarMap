export function GetSystemFromWaypointSymbol(waypointSymbol: string): string
{
  const symbolArray = waypointSymbol.split('-');

  return `${symbolArray[0]}-${symbolArray[1]}`;
}