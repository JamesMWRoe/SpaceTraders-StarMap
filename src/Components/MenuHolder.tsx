
import "../Styles/Menu.css"
import ContextualMenus from "./ContextualMenus";
import SideMenus from "./SideMenus";


type MenuHolderProps = 
{
  contextMenuHiddenClass: 'hiddenMenu' | '';
  setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuHolder({ contextMenuHiddenClass, setIsContextMenuOpen }: MenuHolderProps)
{
  
  return(
  <div id="menuHolder">
    <SideMenus />
    <ContextualMenus contextMenuHiddenClass={contextMenuHiddenClass} setIsContextMenuOpen={setIsContextMenuOpen} />
  </div>
  )
}
