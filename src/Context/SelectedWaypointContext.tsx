import React, { createContext, useContext, useState } from "react";
import { Waypoint } from "../Types/Waypoint"

type SelectedWaypointContext =
{
  selectedWaypoint: Waypoint | null;
  setSelectedWaypoint: React.Dispatch<React.SetStateAction<Waypoint | null>>;
}

type SelectedWaypointContextProviderProps =
{
  children: React.ReactNode;
}

const SelectedWaypointContext = createContext<SelectedWaypointContext | null>(null);

export default function SelectedWaypointContextProvider({children}: SelectedWaypointContextProviderProps)
{
  const [selectedWaypoint, setSelectedWaypoint] = useState<Waypoint | null>(null);

  return(
  <SelectedWaypointContext.Provider value={{selectedWaypoint, setSelectedWaypoint}}>
    {children}
  </SelectedWaypointContext.Provider>
  )
}

export function useSelectedWaypointContext()
{
  const context = useContext(SelectedWaypointContext);

  if (!context) 
  {  throw new Error('useSelectedWaypointContext should only be used within SelectedWaypointContextProvider')  }

  return context;
}