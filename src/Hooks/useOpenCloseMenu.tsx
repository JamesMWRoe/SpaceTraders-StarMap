import { useEffect, useState } from "react";

export default function useOpenCloseMenu()
{

  const [hiddenClass, setHiddenClass] = useState<'hiddenMenu' | ''>('hiddenMenu');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(!isOpen)
    {
      setHiddenClass('hiddenMenu');
      return;
    }

    setHiddenClass('');
  }, [isOpen]);

  const returnProps = {
    hiddenClass: hiddenClass,
    setIsOpen: setIsOpen
  }
  return returnProps;
}
