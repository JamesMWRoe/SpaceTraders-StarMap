import useOpenCloseMenu from "../Hooks/useOpenCloseMenu";
import ContractMenu from "./ContractMenu";
import ShipMenu from "./ShipMenu";
import SideMenu from "./SideMenu";

export default function SideMenus()
{
  const [sideMenuHiddenClass, setIsSideMenuOpen] = useOpenCloseMenu();
  const [contractMenuHiddenClass, setIsContractMenuOpen] = useOpenCloseMenu();
  const [shipMenuHiddenClass, setIsShipMenuOpen] = useOpenCloseMenu();

  return(
    <>
    <button id="sideMenuOpenButton" onClick={() => setIsSideMenuOpen(true)}>|||</button>
    <div id="sideMenus">
      <SideMenu sideMenuHiddenClass={sideMenuHiddenClass} setIsContractMenuOpen={setIsContractMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} setIsShipMenuOpen={setIsShipMenuOpen} />
      <ContractMenu setIsContractMenuOpen={setIsContractMenuOpen} contractMenuHiddenClass={contractMenuHiddenClass} />
      <ShipMenu shipMenuHiddenClass={shipMenuHiddenClass} setIsShipMenuOpen={setIsShipMenuOpen} />
    </div>
    </>
    
  )
}
