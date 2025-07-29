'use client';

import { HexColorPicker } from 'react-colorful';
import { Move, X } from 'lucide-react';
import { useEditor } from '../../../../context/EditorContext';

interface Props {
  panelPos: { x: number; y: number };
  color: string;
  setColor: (newColor: string) => void;
  height: number;
  setHeight: (val: number) => void;
  borderStyle: 'solid' | 'dashed';
  setBorderStyle: (style: 'solid' | 'dashed') => void;
  borderRadius: '0px' | '50px';
  setBorderRadius: (radius: '0px' | '50px') => void;
  onClose: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

export default function LineaPanel({
  panelPos,
  color,
  setColor,
  height,
  setHeight,
  borderStyle,
  setBorderStyle,
  borderRadius,
  setBorderRadius,
  onClose,
  onDragStart,
}: Props) {
  const { updateElementStyle } = useEditor();

  return (
    <div
      className="prop-panel"
      style={{
        position: 'absolute',
        top: panelPos.y,
        left: panelPos.x,
        background: 'rgba(20, 20, 20, 0.9)',
        color: 'white',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '12px',
        padding: '16px',
        zIndex: 999,
        width: '270px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        cursor: 'default',
        userSelect: 'none',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          cursor: 'grab',
        }}
        onMouseDown={onDragStart}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Move size={16} />
          <strong>Propiedades de Línea</strong>
        </div>
        <X size={18} style={{ cursor: 'pointer' }} onClick={onClose} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>🎨 Color:</label>
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>📏 Grosor:</label>
        <input
          type="range"
          min={1}
          max={20}
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
        <span>{height}px</span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>🧵 Estilo:</label>
        <select
          value={borderStyle}
          onChange={(e) => setBorderStyle(e.target.value as 'solid' | 'dashed')}
          style={{ width: '100%' }}
        >
          <option value="solid">Sólida</option>
          <option value="dashed">Punteada</option>
        </select>
      </div>

      <div>
        <label>🔘 Terminación:</label>
        <select
          value={borderRadius}
          onChange={(e) => setBorderRadius(e.target.value as '0px' | '50px')}
          style={{ width: '100%' }}
        >
          <option value="0px">Cuadrada</option>
          <option value="50px">Redonda</option>
        </select>
      </div>
    </div>
  );
}
