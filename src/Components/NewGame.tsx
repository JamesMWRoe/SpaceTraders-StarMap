import { useState } from 'react';
import { useTokenContext } from '../Context/TokenContext';
import { Agent } from '../Types/Agent';

type NewGameProps =
{
  setAgent: React.Dispatch<React.SetStateAction<Agent | undefined>>;
}

export default function NewGame({setAgent}: NewGameProps)
{
  const [ symbol, setSymbol ] = useState("");
  const [ faction, setFaction ] = useState("COSMIC");
  const [ resp, setResp ] = useState("");

  const { setAgentToken } = useTokenContext();

  return(  
    <>
      <div className="inputField">
        <label htmlFor="userSymbol">Call Sign: </label>
        <input type="text" id="userSymbol" value={symbol} onChange={(e) => {setSymbol(e.target.value)}}/>
      </div>

      <div className="inputField">
        <label htmlFor="faction">Starting Faction</label>
        <input type="text" id="faction"  value={faction} onChange={(e) => {setFaction(e.target.value)}} />
      </div>

      <button type="submit" onClick={Signup}>Sign Up</button>

      <span>{resp}</span>
    </>
  )

  async function Signup()
  {
    console.log(`symbol: ` + symbol);
    console.log(`faction: ` + faction);

    const resp = await fetch('https://api.spacetraders.io/v2/register', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        symbol: symbol,
        faction: faction
      })
    });

    const json = await resp.json();

    if (resp.ok)
    {
      console.log('Agent Token: ' + json.data.token);
      setAgentToken(json.data.token);
      setAgent(json.data.agent);
    }

    setResp(JSON.stringify(json, null, 2));

  }
}

