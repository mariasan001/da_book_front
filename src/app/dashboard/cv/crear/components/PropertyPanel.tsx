'use client';

import { HexColorPicker } from 'react-colorful';
import './PropertyPanel.css';
import { useEditor } from '../context/EditorContext';

export default function PropertyPanel() {
  const { selectedElement, getElementById, updateElement } = useEditor();

  if (!selectedElement) return null;

  const element = getElementById(selectedElement);
  if (!element) return null;

  const bgColor = typeof element.style?.backgroundColor === 'string'
    ? element.style.backgroundColor
    : '#ffffff0d';

  const borderStyle = (element.style?.borderStyle || 'solid') as 'solid' | 'dashed';
  const borderRadius = (element.style?.borderRadius || '0px') as '0px' | '50px';
  const height = element.height || 2;

  const handleColorChange = (color: string) => {
    updateElement(selectedElement, {
      style: {
        ...element.style,
        backgroundColor: color,
      },
    });
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(selectedElement, { height: parseInt(e.target.value) });
  };

  const handleBorderStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateElement(selectedElement, {
      style: {
        ...element.style,
        borderStyle: e.target.value,
      },
    });
  };

  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateElement(selectedElement, {
      style: {
        ...element.style,
        borderRadius: e.target.value,
      },
    });
  };

  return (
    <div className="property-panel-embedded">
      {element.type === 'contenedor' && (
        <>
          <h4>🎨 Color del contenedor</h4>
          <HexColorPicker color={bgColor} onChange={handleColorChange} />
        </>
      )}

      {element.type === 'linea' && (
        <>
          <h4>🎨 Color de la línea</h4>
          <HexColorPicker color={bgColor} onChange={handleColorChange} />

          <label style={{ display: 'block', marginTop: 12 }}>📏 Grosor:</label>
          <input
            type="range"
            min={1}
            max={20}
            value={height}
            onChange={handleHeightChange}
            style={{ width: '100%' }}
          />
          <span>{height}px</span>

          <label style={{ display: 'block', marginTop: 12 }}>🧵 Estilo:</label>
          <select
            value={borderStyle}
            onChange={handleBorderStyleChange}
            style={{ width: '100%' }}
          >
            <option value="solid">Sólida</option>
            <option value="dashed">Punteada</option>
          </select>

          <label style={{ display: 'block', marginTop: 12 }}>🔘 Terminación:</label>
          <select
            value={borderRadius}
            onChange={handleBorderRadiusChange}
            style={{ width: '100%' }}
          >
            <option value="0px">Cuadrada</option>
            <option value="50px">Redonda</option>
          </select>
        </>
      )}
    </div>
  );
}
