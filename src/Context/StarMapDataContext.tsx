import { createContext, useContext } from "react";
import { StarmapInfo } from "../Types/StarmapInfo"

type StarmapDataContext =
{
  starmapData: StarmapInfo;
  setStarmapData: React.Dispatch<React.SetStateAction<StarmapInfo | undefined>>;
}

type StarmapDataContextProviderProps =
{
  children: React.ReactNode;
  starmapData: StarmapInfo;
  setStarmapData: React.Dispatch<React.SetStateAction<StarmapInfo | undefined>>;
}

const StarmapDataContext = createContext<StarmapDataContext | undefined>(undefined);

export default function StarMapDataContextProvider({children, starmapData, setStarmapData}: StarmapDataContextProviderProps)
{

  return(
    <StarmapDataContext.Provider value={{starmapData: starmapData, setStarmapData: setStarmapData}} >
      {children}
    </StarmapDataContext.Provider>
  )
}

export function useStarmapDataContext()
{
  const context = useContext(StarmapDataContext);

  if (!context) 
  {  throw new Error("useStarmapDataContext should only be used within StarmapDataContextProvider");  }

  return context;
}
