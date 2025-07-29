'use client';

import { useRef, useState, useEffect } from 'react';
import './Contenedor.css';
import { useEditor } from '../../../context/EditorContext';

interface Props {
  id: string;
}

export default function Contenedor({ id }: Props) {
  const { getElementById, updateElement, selectElement, selectedElement } = useEditor();
  const element = getElementById(id);

  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 200, height: 150 });

  useEffect(() => {
    if (element) {
      setSize({
        width: element.width || 200,
        height: element.height || 150,
      });
    }
  }, [element]);

  if (!element) return null;

  const handleDrag = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    selectElement(id); // 👈 seleccionar al mover

    const startX = e.clientX;
    const startY = e.clientY;
    const startLeft = element.x || 0;
    const startTop = element.y || 0;

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

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(id); // 👈 seleccionar al redimensionar

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(100, startWidth + (e.clientX - startX));
      const newHeight = Math.max(100, startHeight + (e.clientY - startY));

      setSize({ width: newWidth, height: newHeight });
      updateElement(id, {
        width: newWidth,
        height: newHeight,
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const isSelected = selectedElement === id;

  return (
    <div
      ref={ref}
      onMouseDown={handleDrag}
      className="contenedor-bloque"
      style={{
        position: 'absolute',
        left: element.x || 0,
        top: element.y || 0,
        width: size.width,
        height: size.height,
        backgroundColor:
          typeof element.style?.backgroundColor === 'string'
            ? element.style.backgroundColor
            : '#ffffff0d',
        border: isSelected ? '2px solid #007bff' : '1px dashed #aaa',
        cursor: 'move',
        transition: 'border 0.2s ease',
      }}
    >
      <div className="resizer" onMouseDown={handleResize} />
    </div>
  );
}
