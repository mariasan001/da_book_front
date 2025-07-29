'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor } from '../../../context/EditorContext';
import './titulo.css'; // ✅ Importamos el CSS

interface Props {
  id: string;
}

export default function Titulo({ id }: Props) {
  const { getElementById, updateElement, selectElement } = useEditor();
  const element = getElementById(id);
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Drag & Drop funcional
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    const initialX = element?.x || 100;
    const initialY = element?.y || 100;

    const onMouseDown = (e: MouseEvent) => {
      if (isEditing) return; // ❌ No mover si está editando
      e.preventDefault();
      e.stopPropagation();
      selectElement(id);

      startX = e.clientX;
      startY = e.clientY;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        const deltaY = moveEvent.clientY - startY;

        updateElement(id, {
          x: initialX + deltaX,
          y: initialY + deltaY,
        });
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    el.addEventListener('mousedown', onMouseDown);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
    };
  }, [id, element?.x, element?.y, updateElement, selectElement, isEditing]);

  if (!element) return null;

  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.x || 100,
    top: element.y || 100,
    transform: `rotate(${element.rotation || 0}deg)`,
    fontWeight: element.style?.fontWeight as React.CSSProperties['fontWeight'] || 'bold',
    fontStyle: element.style?.fontStyle as React.CSSProperties['fontStyle'] || 'normal',
    color: element.style?.color as React.CSSProperties['color'] || '#000000',
    textAlign: element.style?.textAlign as React.CSSProperties['textAlign'] || 'left',
    fontSize:
      typeof element.style?.fontSize === 'number'
        ? element.style.fontSize
        : parseInt(element.style?.fontSize as string) || 32,
    cursor: 'move',
    userSelect: 'none',
    outline: 'none',
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`titulo ${!element.content ? 'placeholder' : ''}`}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onDoubleClick={() => setIsEditing(true)}
      onBlur={(e) => {
        updateElement(id, { content: e.currentTarget.textContent || '' });
        setIsEditing(false);
      }}
    >
      {element.content || 'Escribe aquí'}
    </div>
  );
}
