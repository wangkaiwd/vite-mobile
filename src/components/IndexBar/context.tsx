import React, { createContext } from 'react';

export interface IndexBarContextProps {
  scrollParent?: HTMLElement | Window;
  onScroll?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const IndexBarContext = createContext<IndexBarContextProps>({});
