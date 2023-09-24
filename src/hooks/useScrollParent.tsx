import { type MutableRefObject, useEffect, useState } from 'react';
import { getScrollParent } from '../utils/dom.ts';

export const useScrollParent = (el: MutableRefObject<HTMLElement | null>) => {
  const [scrollParent, setScrollParent] = useState<HTMLElement | Window>();
  useEffect(() => {
    if (el.current) {
      const parent = getScrollParent(el.current);
      setScrollParent(parent);
    }
  }, []);

  return scrollParent;
};
