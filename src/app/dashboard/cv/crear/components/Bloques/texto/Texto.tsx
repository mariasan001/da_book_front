'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditor } from "../../../context/EditorContext";

interface Props {
  id: string;
}

export default function Texto({ id }: Props) {
  const { getElementById, updateElement, selectElement } = useEditor();
  const el = getElementById(id);
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const div = ref.current;
    if (!div || isEditing) return;

    let startX = 0;
    let startY = 0;
    const initialX = el?.x || 100;
    const initialY = el?.y || 100;

    const onMouseDown = (e: MouseEvent) => {
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

    div.addEventListener('mousedown', onMouseDown);
    return () => {
      div.removeEventListener('mousedown', onMouseDown);
    };
  }, [id, el?.x, el?.y, updateElement, selectElement, isEditing]);

  if (!el) return null;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: el.y || 100,
        left: el.x || 100,
        width: el.width,
        height: el.height,
        transform: `rotate(${el.rotation || 0}deg)`,
        ...el.style,
        cursor: 'move',
        userSelect: 'none',
        outline: 'none',
      }}
      contentEditable={isEditing}
      suppressContentEditableWarning
      onDoubleClick={() => setIsEditing(true)}
      onBlur={(e) => {
        updateElement(id, { content: e.currentTarget.textContent || '' });
        setIsEditing(false);
      }}
    >
      {el.content || 'Texto editable aquí...'}
    </div>
  );
}
