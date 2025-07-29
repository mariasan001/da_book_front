// components/ContextMenu.tsx
'use client';

import { useContextMenu } from '../context/ContextMenuContext';
import './context-menu.css';

export default function ContextMenu() {
  const { x, y, isOpen, items, closeMenu } = useContextMenu();

  if (!isOpen) return null;

  return (
    <ul
      className="context-menu"
      style={{ top: y, left: x, position: 'absolute', zIndex: 1000 }}
      onMouseLeave={closeMenu}
    >
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            item.action();
            closeMenu();
          }}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
}
