'use client';

import { HexColorPicker } from 'react-colorful';
import './PropertyPanel.css';
import { useEditor } from '../context/EditorContext';

export default function PropertyPanel() {
  const { selectedElement, getElementById, updateElement } = useEditor();

  if (!selectedElement) return null;

  const element = getElementById(selectedElement);
  if (!element) return null;

  const bgColor =
    typeof element.style?.backgroundColor === 'string'
      ? element.style.backgroundColor
      : '#000000';

  const fontSize = element.style?.fontSize || '24px';
  const fontWeight = element.style?.fontWeight || 'normal';
  const fontStyle = element.style?.fontStyle || 'normal';
  const textAlign = element.style?.textAlign || 'left';

  const height = element.height || 2;
  const borderStyle = (element.style?.borderStyle || 'solid') as
    | 'solid'
    | 'dashed';
  const borderRadius = (element.style?.borderRadius || '0px') as '0px' | '50px';
  type StyleUpdate = Record<string, string | number>;

  const updateStyle = (newStyle: StyleUpdate) => {
    updateElement(selectedElement, {
      style: {
        ...element.style,
        ...newStyle
      }
    });
  };

  return (
    <div className="property-panel-embedded">
      {/* 🎨 CONTENEDOR */}
      {element.type === 'contenedor' && (
        <>
          <h4>🎨 Color del contenedor</h4>
          <HexColorPicker
            color={bgColor}
            onChange={(color) => updateStyle({ backgroundColor: color })}
          />
        </>
      )}

      {/* ➖ LÍNEA */}
      {element.type === 'linea' && (
        <>
          <h4>🎨 Color de la línea</h4>
          <HexColorPicker
            color={bgColor}
            onChange={(color) => updateStyle({ backgroundColor: color })}
          />

          <label style={{ display: 'block', marginTop: 12 }}>📏 Grosor:</label>
          <input
            type="range"
            min={1}
            max={20}
            value={height}
            onChange={(e) =>
              updateElement(selectedElement, {
                height: parseInt(e.target.value)
              })
            }
            style={{ width: '100%' }}
          />
          <span>{height}px</span>

          <label style={{ display: 'block', marginTop: 12 }}>🧵 Estilo:</label>
          <select
            value={borderStyle}
            onChange={(e) => updateStyle({ borderStyle: e.target.value })}
            style={{ width: '100%' }}
          >
            <option value="solid">Sólida</option>
            <option value="dashed">Punteada</option>
          </select>

          <label style={{ display: 'block', marginTop: 12 }}>
            🔘 Terminación:
          </label>
          <select
            value={borderRadius}
            onChange={(e) => updateStyle({ borderRadius: e.target.value })}
            style={{ width: '100%' }}
          >
            <option value="0px">Cuadrada</option>
            <option value="50px">Redonda</option>
          </select>
        </>
      )}

     {element.type === 'titulo' && (
  <>
    <h4>✏️ Estilo del Título</h4>

    {/* 🎨 Color */}
    <label>🎨 Color:</label>
    <HexColorPicker
      color={typeof element.style?.color === 'string' ? element.style.color : '#000000'}
      onChange={(color) =>
        updateElement(selectedElement, {
          style: {
            ...element.style,
            color,
          },
        })
      }
    />

    {/* 📏 Tamaño */}
    <label>📏 Tamaño:</label>
    <input
      type="number"
      min={10}
      max={100}
      value={element.style?.fontSize || 32}
      onChange={(e) =>
        updateElement(selectedElement, {
          style: {
            ...element.style,
            fontSize: parseInt(e.target.value),
          },
        })
      }
    />

    {/* 🅱️ Peso */}
    <label>🅱️ Peso:</label>
    <select
      value={element.style?.fontWeight || 'bold'}
      onChange={(e) =>
        updateElement(selectedElement, {
          style: {
            ...element.style,
            fontWeight: e.target.value,
          },
        })
      }
    >
      <option value="normal">Normal</option>
      <option value="bold">Negrita</option>
      <option value="lighter">Ligero</option>
    </select>

    {/* 🔠 Alineación */}
    <label>🔠 Alineación:</label>
    <select
      value={element.style?.textAlign || 'left'}
      onChange={(e) =>
        updateElement(selectedElement, {
          style: {
            ...element.style,
            textAlign: e.target.value as 'left' | 'center' | 'right',
          },
        })
      }
    >
      <option value="left">Izquierda</option>
      <option value="center">Centro</option>
      <option value="right">Derecha</option>
    </select>

    {/* ✍️ Cursiva */}
    <label>✍️ Cursiva:</label>
    <select
      value={element.style?.fontStyle || 'normal'}
      onChange={(e) =>
        updateElement(selectedElement, {
          style: {
            ...element.style,
            fontStyle: e.target.value as 'normal' | 'italic',
          },
        })
      }
    >
      <option value="normal">No</option>
      <option value="italic">Sí</option>
    </select>

    {/* 🔁 Rotación */}
    <label>🔁 Rotación:</label>
    <input
      type="range"
      min={-180}
      max={180}
      step={1}
      value={element.rotation || 0}
      onChange={(e) =>
        updateElement(selectedElement, {
          rotation: parseInt(e.target.value),
        })
      }
    />
    <input
      type="number"
      min={-180}
      max={180}
      value={element.rotation || 0}
      onChange={(e) =>
        updateElement(selectedElement, {
          rotation: parseInt(e.target.value),
        })
      }
      style={{ width: '100%', marginTop: 4 }}
    />
    <span>{element.rotation || 0}°</span>
  </>
)}

    </div>
  );
}
