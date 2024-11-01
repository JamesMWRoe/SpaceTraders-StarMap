import { useAgentContext } from "../Context/AgentContext"
import StarMap from "./StarMap";
import WaypointContextMenu from "./WaypointContextMenu";
import '../styles/Game.css'
import { useState } from "react";
import { Waypoint } from "../Types/Waypoint";
import SelectedWaypointContextProvider from "../Context/SelectedWaypointContext";

export default function Game()
{
  const { agent } = useAgentContext();

  return(
    <div id="mainGame">
      <SelectedWaypointContextProvider>
        <StarMap />
        <WaypointContextMenu />
      </SelectedWaypointContextProvider>
    </div>
    
  )
}