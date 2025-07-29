// hooks/useLineaLogic.ts
import { useRef } from 'react';
import { useEditor } from '../../../../context/EditorContext';
import { useContextMenu } from '../../../../context/ContextMenuContext';

export const useLineaLogic = (id: string) => {
  const {
    getElementById,
    updateElement,
    selectedElement,
    selectElement,
    deleteElement,
    duplicateElement
  } = useEditor();

  const { openMenu } = useContextMenu();
  const element = getElementById(id);
  const ref = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectElement(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = element?.x || 0;
    const startTop = element?.y || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newX = startLeft + (moveEvent.clientX - startX);
      const newY = startTop + (moveEvent.clientY - startY);
      updateElement(id, { x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openMenu(e.clientX, e.clientY, [
      { label: 'Duplicar', action: () => duplicateElement(id) },
      { label: 'Eliminar', action: () => deleteElement(id) },
    ]);
  };

  const rotation = parseFloat((element?.style?.rotate as string) || '0');
  const endX = (element?.x || 0) + (element?.width || 200) * Math.cos(rotation * (Math.PI / 180));
  const endY = (element?.y || 0) + (element?.width || 200) * Math.sin(rotation * (Math.PI / 180));

  const lineStyle = (
    color: string,
    height: number,
    borderStyle: 'solid' | 'dashed',
    borderRadius: '0px' | '50px'
  ) => ({
    position: 'absolute' as const,
    left: element?.x || 0,
    top: element?.y || 0,
    width: `${element?.width || 200}px`,
    height: `${height}px`,
    backgroundColor: borderStyle === 'solid' ? color : 'transparent',
    backgroundImage:
      borderStyle === 'dashed'
        ? `repeating-linear-gradient(to right, ${color}, ${color} 5px, transparent 5px, transparent 10px)`
        : 'none',
    borderRadius,
    cursor: 'move',
    transform: `rotate(${rotation}deg)`,
    transformOrigin: 'left center'
  });
  return {
    element,
    ref,
    selectedElement,
    handleDrag,
    handleContextMenu,
    lineStyle,
    endX,
    endY,
    updateElement,
    selectElement, // ✅ <--- Agrégalo aquí
  };
};
