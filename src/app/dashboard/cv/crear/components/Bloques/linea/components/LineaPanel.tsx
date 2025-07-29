// components/LineaPanel.tsx
import { HexColorPicker } from 'react-colorful';
import { Move } from 'lucide-react';

interface Props {
  panelPos: { x: number; y: number };
  color: string;
  setColor: (color: string) => void;
  height: number;
  setHeight: (h: number) => void;
  borderStyle: 'solid' | 'dashed';
  setBorderStyle: (style: 'solid' | 'dashed') => void;
  borderRadius: '0px' | '50px';
  setBorderRadius: (r: '0px' | '50px') => void;
  onClose: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

export const LineaPanel = ({
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
  onDragStart
}: Props) => {
  return (
    <div
      className="prop-panel"
      style={{
        position: 'absolute',
        top: panelPos.y,
        left: panelPos.x,
        background: 'rgba(20, 20, 20, 0.85)',
        color: 'white',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '12px',
        padding: '16px',
        zIndex: 999,
        width: '260px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          cursor: 'grab'
        }}
        onMouseDown={onDragStart}
      >
        <Move size={16} />
        <strong>Propiedades</strong>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Color:</label>
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Grosor:</label>
        <input
          type="range"
          min={1}
          max={20}
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
        <span>{height}px</span>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Estilo:</label>
        <select
          value={borderStyle}
          onChange={(e) => setBorderStyle(e.target.value as 'solid' | 'dashed')}
        >
          <option value="solid">Sólida</option>
          <option value="dashed">Punteada</option>
        </select>
      </div>

      <div>
        <label>Terminación:</label>
        <select
          value={borderRadius}
          onChange={(e) => setBorderRadius(e.target.value as '0px' | '50px')}
        >
          <option value="0px">Cuadrada</option>
          <option value="50px">Redonda</option>
        </select>
      </div>

      <button
        style={{
          marginTop: 12,
          width: '100%',
          background: '#f44336',
          border: 'none',
          color: 'white',
          padding: '6px 0',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
        onClick={onClose}
      >
        Cerrar panel
      </button>
    </div>
  );
};
