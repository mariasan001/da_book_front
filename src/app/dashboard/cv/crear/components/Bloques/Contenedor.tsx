'use client';
import { useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette } from 'lucide-react'; // ← Ícono Lucide aquí
import { useEditor } from '../../context/EditorContext';
import './Contenedor.css';

interface Props {
  id: string;
}

export default function Contenedor({ id }: Props) {
  const { getElementById, updateElement } = useEditor();
  const element = getElementById(id);

  const ref = useRef<HTMLDivElement>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [bgColor, setBgColor] = useState(() => {
    const defaultColor = '#ffffff0d';
    const styleColor = typeof element?.style?.backgroundColor === 'string'
      ? element.style.backgroundColor
      : defaultColor;
    return /^#/.test(styleColor) ? styleColor : defaultColor;
  });

  const [size, setSize] = useState(() => ({
    width: element?.width || 200,
    height: element?.height || 150,
  }));

  if (!element) return null;

  const handleDrag = (e: React.MouseEvent) => {
    if (showPicker) return;
    e.preventDefault();
    e.stopPropagation();

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

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(100, startWidth + (e.clientX - startX));
      const newHeight = Math.max(100, startHeight + (e.clientY - startY));
      setSize({ width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      updateElement(id, {
        width: size.width,
        height: size.height,
      });
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleColorChange = (newColor: string) => {
    setBgColor(newColor);
    updateElement(id, {
      style: {
        backgroundColor: newColor,
      },
    });
  };

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
        backgroundColor: bgColor,
        border: '1px dashed #aaa',
        cursor: showPicker ? 'default' : 'move',
      }}
    >
      <div className="resizer" onMouseDown={handleResize} />

      <button
        className={`color-btn ${showPicker ? 'active' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setShowPicker(!showPicker);
        }}
      >
        <Palette size={16} />
      </button>

      {showPicker && (
        <div
          className="color-picker-popup"
          onMouseDown={(e) => e.stopPropagation()}
          onMouseMove={(e) => e.stopPropagation()}
        >
          <HexColorPicker color={bgColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}
