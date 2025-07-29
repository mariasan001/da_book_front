// components/Panels/LineaPropertiesPanel.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { GripVertical, X } from 'lucide-react';
import './LineaPropertiesPanel.css'; // Ahora crearemos este CSS

interface Props {
  onClose: () => void;
  color: string;
  onColorChange: (color: string) => void;
  thickness: number;
  onThicknessChange: (value: number) => void;
  type: string;
  onTypeChange: (type: string) => void;
  cap: string;
  onCapChange: (cap: string) => void;
}

export default function LineaPropertiesPanel({
  onClose,
  color,
  onColorChange,
  thickness,
  onThicknessChange,
  type,
  onTypeChange,
  cap,
  onCapChange,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y,
      });
    }
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={panelRef}
      className="linea-panel"
      style={{ top: position.y, left: position.x }}
    >
      <div className="linea-panel-header" onMouseDown={handleMouseDown}>
        <GripVertical size={16} />
        <button className="close-btn" onClick={onClose}><X size={16} /></button>
      </div>

      <div className="linea-panel-body">
        <label>Grosor:</label>
        <input
          type="range"
          min={1}
          max={20}
          value={thickness}
          onChange={e => onThicknessChange(Number(e.target.value))}
        />

        <label>Tipo:</label>
        <select value={type} onChange={e => onTypeChange(e.target.value)}>
          <option value="solid">Sólida</option>
          <option value="dashed">Punteada</option>
        </select>

        <label>Terminación:</label>
        <select value={cap} onChange={e => onCapChange(e.target.value)}>
          <option value="square">Cuadrada</option>
          <option value="round">Redonda</option>
        </select>

        <label>Color:</label>
        <HexColorPicker color={color} onChange={onColorChange} />
      </div>
    </div>
  );
}
