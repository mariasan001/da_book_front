'use client';

import { useEffect, useRef } from 'react';
import { useEditor } from '../../../context/EditorContext';

interface Props {
  id: string;
}

export default function Imagen({ id }: Props) {
  const { getElementById, updateElement, selectElement } = useEditor();
  const el = getElementById(id);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

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

    img.addEventListener('mousedown', onMouseDown);
    return () => {
      img.removeEventListener('mousedown', onMouseDown);
    };
  }, [id, el?.x, el?.y, updateElement, selectElement]);

  if (!el) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateElement(id, {
        content: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
     <img
  ref={imgRef}
  src={
    typeof el.content === 'string'
      ? el.content
      : 'https://via.placeholder.com/150'
  }
  alt="Elemento visual"
  onDoubleClick={handleImageClick}
  style={{
    position: 'absolute',
    top: el.y || 100,
    left: el.x || 100,
    width: el.width || 150,
    height: el.height || 'auto',
    transform: `rotate(${el.rotation || 0}deg)`,
    ...el.style,
    cursor: 'move',
    userSelect: 'none',
  }}
/>


      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
