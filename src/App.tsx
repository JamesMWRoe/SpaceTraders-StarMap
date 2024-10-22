import './styles/App.css'
import NewGame from './Components/NewGame'
import { useState } from 'react'
import TokenContextProvider from './Context/TokenContext'
import { Agent } from './Types/Agent';
import AgentContextProvider from './Context/AgentContext';
import Game from './Components/Game';
import LoadGame from './Components/LoadGame';

function App() {

  const [ agent, setAgent ] = useState<Agent | undefined>(undefined);


  return (
    <>
      <TokenContextProvider>
        {HandleGamePage()}
      </TokenContextProvider>
    </>
  )

  function HandleGamePage()
  {
    console.log(`agent: ${agent}`);
    if (!agent)
    { return (
      <>
        <NewGame setAgent={setAgent} />
        <LoadGame setAgent={setAgent} />
      </>
    )  
    }

    return (
    <>
      <AgentContextProvider agent={agent} setAgent={setAgent} >
        <Game />
      </AgentContextProvider>
    </>
    )
  }
}

export default App
