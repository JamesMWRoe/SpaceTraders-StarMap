import { useState } from "react";
import { useTokenContext } from "../Context/TokenContext";
import { Agent } from "../Types/Agent";

type LoadGameProps =
{
  setAgent: React.Dispatch<React.SetStateAction<Agent | undefined>>;
}

export default function LoadGame({setAgent}: LoadGameProps)
{
  const [ token, setToken ] = useState("");
  const [ resp, setResp ] = useState("");

  const {setAgentToken} = useTokenContext();
  
   return (
    <>
      <label htmlFor="agentToken">Agent Token: </label>
      <input type="text" id="agentToken" value={token} onChange={e => setToken(e.target.value)} />

      <button type="submit" onClick={Login}>Login</button>

      <span>{resp}</span>
    </>
   )

    async function Login()
    {
      const resp = await fetch(`https://api.spacetraders.io/v2/my/agent`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      const json = await resp.json();

      if (resp.ok)
      {
        setAgentToken(token);
        setAgent(json.data);
      }

      setResp(JSON.stringify(json, null, 2));

    }
}