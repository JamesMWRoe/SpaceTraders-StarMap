import { useEffect, useState } from "react";

export default function useOpenCloseMenu(relatedObject: unknown)
{

  const [hiddenClass, setHiddenClass] = useState<'isHidden' | ''>('isHidden');

  useEffect(() => {
    if(!relatedObject)
    {
      setHiddenClass('isHidden');
      return;
    }

    setHiddenClass('');
  }, [relatedObject]);

  return hiddenClass;
}
