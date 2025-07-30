'use client';

import React, { useRef } from 'react';
import { useEditor } from '../../context/EditorContext';

interface Props {
  id: string;
}

export default function Mosaico({ id }: Props) {
  const { getElementById, updateElement, selectElement } = useEditor();
  const el = getElementById(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!el || el.type !== 'mosaico') return null;

  const columns = el.columns || 3;
  const spacing = el.spacing || 4;
  const images = Array.isArray(el.content) ? el.content : [];

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          updateElement(id, {
            content: [...images, ...newImages],
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: spacing,
        padding: 8,
        position: 'absolute',
        top: el.y || 100,
        left: el.x || 100,
        width: el.width || 300,
        backgroundColor: '#f0f0f0',
        border: '1px dashed #ccc',
        borderRadius: 8,
      }}
    >
      {images.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={index}
          src={src}
          alt={`img-${index}`}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 4,
          }}
        />
      ))}

      {/* Botón flotante para subir imágenes */}
      <button
        onClick={handleClick}
        style={{
          gridColumn: `span ${columns}`,
          padding: 10,
          backgroundColor: '#fff',
          border: '1px solid #aaa',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        ➕ Agregar imágenes
      </button>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}
