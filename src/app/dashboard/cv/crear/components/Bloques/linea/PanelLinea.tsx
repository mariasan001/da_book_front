import { HexColorPicker } from 'react-colorful';
import { Move } from 'lucide-react';
import { ElementoCV } from '../../../types/types';
import { useEditor } from '../../../context/EditorContext';

interface Props {
  id: string;
  element?: ElementoCV; // <- Hacemos que sea opcional por seguridad
  color: string;
  height: number;
  panelPos?: { x: number; y: number }; // <- También opcional
  setColor: (color: string) => void;
  setHeight: (h: number) => void;
  borderStyle: 'solid' | 'dashed';
  setBorderStyle: (style: 'solid' | 'dashed') => void;
  borderRadius: '0px' | '50px';
  setBorderRadius: (r: '0px' | '50px') => void;
  setShowPanel: (show: boolean) => void;
  startPanelDrag: (e: React.MouseEvent) => void;
}

export default function PanelLinea({
  id,
  element,
  color,
  height,
  panelPos = { x: 100, y: 100 }, // fallback si no llega definido
  setColor,
  setHeight,
  borderStyle,
  setBorderStyle,
  borderRadius,
  setBorderRadius,
  setShowPanel,
  startPanelDrag,
}: Props) {
  const { updateElement } = useEditor();

  // Si `element` no existe aún, no renderizamos nada
  if (!element) return null;

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
        border: '1px solid rgba(255,255,255,0.3)',
        borderRadius: '12px',
        padding: '16px',
        zIndex: 999,
        width: '260px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          cursor: 'grab',
        }}
        onMouseDown={startPanelDrag}
      >
        <Move size={16} />
        <strong>Propiedades</strong>
      </div>

      {/* Color */}
      <div style={{ marginBottom: 12 }}>
        <label>Color:</label>
        <HexColorPicker
          color={color}
          onChange={(newColor) => {
            setColor(newColor);
            updateElement(id, {
              style: {
                ...(element?.style || {}),
                backgroundColor: newColor,
              },
            });
          }}
        />
      </div>

      {/* Grosor */}
      <div style={{ marginBottom: 12 }}>
        <label>Grosor:</label>
        <input
          type="range"
          min={1}
          max={20}
          value={height}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setHeight(val);
            updateElement(id, { height: val });
          }}
        />
        <span>{height}px</span>
      </div>

      {/* Estilo de línea */}
      <div style={{ marginBottom: 12 }}>
        <label>Estilo de línea:</label>
        <select
          value={borderStyle}
          onChange={(e) => {
            const style = e.target.value as 'solid' | 'dashed';
            setBorderStyle(style);
            updateElement(id, {
              style: {
                ...(element?.style || {}),
                borderStyle: style,
              },
            });
          }}
        >
          <option value="solid">Sólido</option>
          <option value="dashed">Punteado</option>
        </select>
      </div>

      {/* Terminación */}
      <div style={{ marginBottom: 12 }}>
        <label>Terminación:</label>
        <select
          value={borderRadius}
          onChange={(e) => {
            const val = e.target.value as '0px' | '50px';
            setBorderRadius(val);
            updateElement(id, {
              style: {
                ...(element?.style || {}),
                borderRadius: val,
              },
            });
          }}
        >
          <option value="0px">Cuadrado</option>
          <option value="50px">Redondeado</option>
        </select>
      </div>

      {/* Botón cerrar */}
      <button
        style={{
          marginTop: 12,
          width: '100%',
          background: '#f44336',
          border: 'none',
          color: 'white',
          padding: '6px 0',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
        onClick={() => setShowPanel(false)}
      >
        Cerrar panel
      </button>
    </div>
  );
}
