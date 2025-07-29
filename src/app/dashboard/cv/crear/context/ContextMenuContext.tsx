// context/ContextMenuContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type MenuItem = {
  label: string;
  action: () => void;
};

interface ContextMenuContextType {
  x: number;
  y: number;
  isOpen: boolean;
  items: MenuItem[];
  openMenu: (x: number, y: number, items: MenuItem[]) => void;
  closeMenu: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(undefined);

export function ContextMenuProvider({ children }: { children: ReactNode }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);

  const openMenu = (x: number, y: number, items: MenuItem[]) => {
    setX(x);
    setY(y);
    setItems(items);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setItems([]);
  };

  return (
    <ContextMenuContext.Provider value={{ x, y, isOpen, items, openMenu, closeMenu }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

export function useContextMenu() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu debe usarse dentro de un ContextMenuProvider');
  }
  return context;
}
