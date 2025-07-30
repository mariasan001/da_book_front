'use client';

import { useEffect, useRef, useState } from 'react';
import { LucideIcon, icons } from 'lucide-react';
import { useEditor } from '../../../../context/EditorContext';

interface Props {
  id: string;
}

export default function Icono({ id }: Props) {
  const { getElementById, updateElement, selectElement } = useEditor();
  const el = getElementById(id);
  const ref = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);

useEffect(() => {
  if (!el || !ref.current) return;

  const div = ref.current;

  let startX = 0;
  let startY = 0;
  const initialX = el.x || 100;
  const initialY = el.y || 100;

  const onMouseDown = (e: MouseEvent) => {
    if (e.detail === 2) return;
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
}, [id, el, selectElement, updateElement]);

  if (!el || !el.iconName) return null;

  const Icon = icons[el.iconName as keyof typeof icons] as LucideIcon;

  return (
    <>
      <div
        ref={ref}
        onClick={() => selectElement(id)}
        onDoubleClick={() => setShowModal(true)} // Mostrar modal al doble clic
        style={{
          position: 'absolute',
          top: el.y || 100,
          left: el.x || 100,
          transform: `rotate(${el.rotation || 0}deg)`,
          cursor: 'move',
          ...el.style,
        }}
      >
        <Icon size={el.width ?? 32} />
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="icon-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Selecciona un ícono</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {Object.keys(icons).slice(0, 30).map((key) => {
                const IconPreview = icons[key as keyof typeof icons] as LucideIcon;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      updateElement(id, { iconName: key });
                      setShowModal(false);
                    }}
                    style={{ padding: 6, border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer' }}
                  >
                    <IconPreview size={24} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
