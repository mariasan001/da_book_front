// hooks/useLineaPanel.ts
import { useEffect, useRef, useState } from 'react';
import type { ElementoCV } from '../../../../types/types'; // Asegúrate de tener este tipo
// O cambia a lo que uses realmente para representar el “element”

export const useLineaPanel = (id: string, element: ElementoCV | undefined) => {
const [color, setColor] = useState<string>(() => String(element?.style?.backgroundColor || '#000000'));
  const [height, setHeight] = useState<number>(element?.height || 4);
  const [borderStyle, setBorderStyle] = useState<'solid' | 'dashed'>('solid');
  const [borderRadius, setBorderRadius] = useState<'0px' | '50px'>('0px');
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [panelPos, setPanelPos] = useState({ x: 100, y: 100 });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (dragging.current) {
        setPanelPos({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };

    const stopDragging = () => {
      dragging.current = false;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', stopDragging);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', stopDragging);
    };
  }, []);

  const startPanelDrag = (e: React.MouseEvent) => {
    dragging.current = true;
    dragOffset.current = {
      x: e.clientX - panelPos.x,
      y: e.clientY - panelPos.y,
    };
  };

  return {
    color,
    setColor,
    height,
    setHeight,
    borderStyle,
    setBorderStyle,
    borderRadius,
    setBorderRadius,
    showPanel,
    setShowPanel,
    panelPos,
    setPanelPos,
    startPanelDrag,
  };
};
