'use client';

import { useEffect, useRef, useState } from 'react';
import { ElementoCV } from '../../../types/types';
import { useEditor } from '../../../context/EditorContext';
import './Enlace.css';

interface Props {
  id: string;
  element: ElementoCV;
}

export default function Enlace({ id, element }: Props) {
  const { updateElement, selectElement, selectedElement } = useEditor();
  const ref = useRef<HTMLAnchorElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const isSelected = selectedElement === id;

  // 🟡 DRAG & DROP
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    const initialX = element.x ?? 100;
    const initialY = element.y ?? 100;

    const onMouseDown = (e: MouseEvent) => {
      if (isEditing) return;
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
  }, [id, element.x, element.y, updateElement, selectElement, isEditing]);

  // 🔵 ESTILOS
  const style: React.CSSProperties = {
    position: 'absolute',
    left: element.x ?? 100,
    top: element.y ?? 100,
    transform: `rotate(${element.rotation || 0}deg)`,
    fontWeight: element.style?.fontWeight as React.CSSProperties['fontWeight'] || 'normal',
    fontStyle: element.style?.fontStyle as React.CSSProperties['fontStyle'] || 'normal',
    color: element.style?.color as React.CSSProperties['color'] || '#1E90FF',
    textAlign: element.style?.textAlign as React.CSSProperties['textAlign'] || 'left',
    fontSize:
      typeof element.style?.fontSize === 'number'
        ? element.style.fontSize
        : parseInt(element.style?.fontSize as string) || 16,
    cursor: isEditing ? 'text' : 'move',
    textDecoration: element.style?.textDecoration as string || 'underline',
    outline: isSelected ? '2px dashed #3b82f6' : 'none',
    userSelect: isEditing ? 'text' : 'none',
    padding: '2px',
  };

  // 🧠 FUNCIÓN CLICK
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey) return; // permite abrir con Ctrl
    e.preventDefault();
    e.stopPropagation();
    selectElement(id);
  };

  return (
    <a
      ref={ref}
      id={id}
      href={element.href || '#'}
      title={element.href}
      style={style}
      onClick={handleClick}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={(e) => {
        updateElement(id, { content: e.currentTarget.textContent || '' });
        setIsEditing(false);
      }}
      className={`editor-link ${!element.content ? 'placeholder' : ''}`}
      contentEditable={isEditing}
      suppressContentEditableWarning
    >
      {element.content || 'Escribe tu enlace'}
    </a>
  );
}
