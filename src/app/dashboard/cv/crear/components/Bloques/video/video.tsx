'use client';

import { useEffect, useRef } from 'react';
import { ElementoCV } from '../../../types/types';
import { useEditor } from '../../../context/EditorContext';

interface Props {
  id: string;
  element: ElementoCV;
}

export default function Video({ id, element }: Props) {
  const { updateElement, selectElement, selectedElement } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedElement === id;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    const initialX = element.x ?? 100;
    const initialY = element.y ?? 100;

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

    el.addEventListener('mousedown', onMouseDown);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
    };
  }, [id, element.x, element.y, updateElement, selectElement]);

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    left: element.x ?? 100,
    top: element.y ?? 100,
    width: element.width ?? 300,
    height: element.height ?? 200,
    transform: `rotate(${element.rotation || 0}deg)`,
    border: isSelected ? '2px dashed #3b82f6' : 'none',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    background: 'transparent',
  };

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    pointerEvents: 'auto',
    zIndex: 1,
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={overlayStyle} />
      <iframe
        src={typeof element.content === 'string' ? element.content : ''}
        style={iframeStyle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded Video"
      />
    </div>
  );
}
 

