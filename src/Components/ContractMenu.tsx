import { useEffect, useState } from "react"
import { GetDataList } from "../Helpers/ApiRequests";
import { useTokenContext } from "../Context/TokenContext";
import { Contract } from "../Types/Contract";
import ContractItem from "./ContractItem";
import '../Styles/ContractMenu.css'

type ContractMenuProps = 
{
  contractMenuHiddenClass: "hiddenMenu" | "";
  setIsContractMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ContractMenu({contractMenuHiddenClass, setIsContractMenuOpen}: ContractMenuProps)
{
  const [hasLoaded, setHasLoaded] = useState(false);
  const [contracts, setContracts] = useState<Array<Contract> | null>(null);

  const {agentToken} = useTokenContext();

  useEffect(() => {
    let ignore = false;

    const fetchContracts = async () =>
    {
      const contractArray = await GetDataList('/my/contracts', agentToken);
      setHasLoaded(true);
      if (!ignore) setContracts(contractArray);
    }

    fetchContracts();
    

    return () => { ignore = true; }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!hasLoaded)
  { return <p className="loading">Loading Contracts...</p> }

  if(!contracts)
  { 
    return (
    <div id="contractMenu" className={`menu ${contractMenuHiddenClass}`}>
      <h2 id="contractMenuHeader">Contracts</h2>
      <p className="emptyList">You currently have no contracts.</p>
    </div>
    ) 
  }

  return(
  <div id="contractMenu" className={`menu ${contractMenuHiddenClass}`}>
    <button id="closeContractsMenu" onClick={() => {setIsContractMenuOpen(false)}}>X</button>
    <ol id="contractsList">
      {contracts.map(contract => <ContractItem contract={contract} />)}
    </ol>
  </div>
    
  )
}
