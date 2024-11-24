import { useState } from 'react';
import { useTokenContext } from '../Context/TokenContext';
import { Agent } from '../Types/Agent';
import { PostData } from '../Helpers/ApiRequests';

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
    const signupBody = {
      symbol: symbol,
      faction: faction
    }

    const signupData = await PostData('/register', signupBody);

    
    if (signupData.respStatus == 201)
    {
      console.log('Agent Token: ' + signupData.data.token);
      setAgentToken(signupData.data.token);
      setAgent(signupData.data.agent);
    }
    
    console.log(signupData.respStatus);
    setResp(JSON.stringify(signupData.data, null, 2));

  }
}

