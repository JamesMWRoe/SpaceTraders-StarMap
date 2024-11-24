import React from "react";

type SideMenuProps =
{
  sideMenuHiddenClass: "hiddenMenu" | "";

  setIsSideMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShipMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsContractMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideMenu({sideMenuHiddenClass, setIsSideMenuOpen, setIsShipMenuOpen, setIsContractMenuOpen}: SideMenuProps)
{
  return(
  <div id="sideMenu" className={`menu ${sideMenuHiddenClass}`}>
    <div id="sideMenuHead">
      <h2 id="sideMenuHeader">Menu</h2>
      <button id="closeSideMenuButton" onClick={() => setIsSideMenuOpen(false)}>X</button>
    </div>
    
    <nav id="profileNav">
      <ul>
        <li className="sideMenuOption" onClick={() => setIsShipMenuOpen(true)} >Ships</li>
        <li className="sideMenuOption" onClick={() => setIsContractMenuOpen(true)} >Contracts</li>
        
      </ul>
    </nav>
  </div>
    
  )
}
