import { createContext, useContext, useState } from "react"

type TokenContext =
{
  agentToken: string;
  setAgentToken: React.Dispatch<React.SetStateAction<string>>;
}

type TokenContextProps =
{
  children: React.ReactNode;
}

const TokenContext = createContext<TokenContext | null>(null);

export default function TokenContextProvider({children}: TokenContextProps)
{

  const [ agentToken, setAgentToken ] = useState("");

  return(
    <TokenContext.Provider value={{agentToken, setAgentToken}}>
      {children}
    </TokenContext.Provider>
  )
}

export function useTokenContext()
{
  const context = useContext(TokenContext);
  if(!context)
  { throw new Error("useTokenContext should only be used within TokenContextProvider");  }
  
  return context;
}