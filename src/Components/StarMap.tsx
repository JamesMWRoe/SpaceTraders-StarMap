import { useState } from "react";
import { StarmapInfo } from "../Types/StarmapInfo";
import { useAgentContext } from "../Context/AgentContext";
import { GetSystemFromWaypointSymbol } from "../Helpers/WaypointSymbolParsers";

export default function StarMap()
{
  const [ starmapInfo, setStarmapInfo ] = useState<StarmapInfo | undefined>(undefined);
  const [ resp, setResp ] = useState("");

  const { agent } = useAgentContext();

  if (!starmapInfo)
  {  LoadStarmap();  }

  return (
    <>
      <span className="respData">{resp}</span>
    </>
  )

  async function LoadStarmap()
  {

    const systemSymbol = GetSystemFromWaypointSymbol(agent.headquarters);

    const resp = await fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=1`, {
      headers: {  Accept: "application/json"  }
    });

    const json = await resp.json();
    const numberOfWaypoints = json.meta.total;

    const numberOfPages = Math.ceil(numberOfWaypoints/20);

    const pagePromiseArray = [];

    for(let i=1; i<=numberOfPages; i++)
    {
      const pageResp = fetch(`https://api.spacetraders.io/v2/systems/${systemSymbol}/waypoints?limit=20&page=${i}`, {
        headers: {  Accept: "application/json"  }
      });

      pagePromiseArray.push(pageResp);
      console.log(`getting page: ${i}/${numberOfPages} `);

    }

    const pageData = await Promise.all(pagePromiseArray);

    console.log(pageData);

    const pageJson = await Promise.all(pageData.map( resp => resp.json()));

    console.log(pageJson);

    const data = pageJson.reduce((arr, json) => {
      return arr.concat(json.data);
    }, []);

    console.log(data);

    setStarmapInfo({...starmapInfo, waypointArray: data});
    setResp(JSON.stringify(pageJson, null, 2));

  } 
}