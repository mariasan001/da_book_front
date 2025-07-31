'use client';

import { HexColorPicker } from 'react-colorful';
import './PropertyPanel.css';
import { useEditor } from '../context/EditorContext';

export default function PropertyPanel() {
  const { selectedElement, getElementById, updateElement } = useEditor();

  if (!selectedElement) return null;

  const element = getElementById(selectedElement);
  if (!element) return null;
  const safeParse = (val: string | number | undefined, defaultVal: number) => {
    return typeof val === 'string' ? parseInt(val) : val ?? defaultVal;
  };

  const bgColor =
    typeof element.style?.backgroundColor === 'string'
      ? element.style.backgroundColor
      : '#000000';

  const updateStyle = (newStyle: Record<string, string | number>) => {
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

          <label>📏 Grosor:</label>
          <input
            type="range"
            min={1}
            max={20}
            value={element.height || 2}
            onChange={(e) =>
              updateElement(selectedElement, {
                height: parseInt(e.target.value)
              })
            }
            style={{ width: '100%' }}
          />
          <span>{element.height || 2}px</span>

          <label>🧵 Estilo:</label>
          <select
            value={element.style?.borderStyle || 'solid'}
            onChange={(e) => updateStyle({ borderStyle: e.target.value })}
          >
            <option value="solid">Sólida</option>
            <option value="dashed">Punteada</option>
          </select>

          <label>🔘 Terminación:</label>
          <select
            value={element.style?.borderRadius || '0px'}
            onChange={(e) => updateStyle({ borderRadius: e.target.value })}
          >
            <option value="0px">Cuadrada</option>
            <option value="50px">Redonda</option>
          </select>
        </>
      )}

      {/* ✏️ TÍTULO */}
      {element.type === 'titulo' && (
        <>
          <h4>✏️ Estilo del Título</h4>

          <label>🎨 Color:</label>
          <HexColorPicker
            color={element.style?.color || '#000000'}
            onChange={(color) => updateStyle({ color })}
          />

          <label>📏 Tamaño:</label>
          <input
            type="number"
            min={10}
            max={100}
            value={safeParse(element.style?.fontSize, 32)}
            onChange={(e) =>
              updateStyle({ fontSize: parseInt(e.target.value) })
            }
          />

          <label>🅱️ Peso:</label>
          <select
            value={element.style?.fontWeight || 'bold'}
            onChange={(e) => updateStyle({ fontWeight: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="bold">Negrita</option>
            <option value="lighter">Ligero</option>
          </select>

          <label>🔠 Alineación:</label>
          <select
            value={element.style?.textAlign || 'left'}
            onChange={(e) => updateStyle({ textAlign: e.target.value })}
          >
            <option value="left">Izquierda</option>
            <option value="center">Centro</option>
            <option value="right">Derecha</option>
          </select>

          <label>✍️ Cursiva:</label>
          <select
            value={element.style?.fontStyle || 'normal'}
            onChange={(e) => updateStyle({ fontStyle: e.target.value })}
          >
            <option value="normal">No</option>
            <option value="italic">Sí</option>
          </select>

          <label>🔁 Rotación:</label>
          <input
            type="range"
            min={-180}
            max={180}
            value={element.rotation || 0}
            onChange={(e) =>
              updateElement(selectedElement, {
                rotation: parseInt(e.target.value)
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
                rotation: parseInt(e.target.value)
              })
            }
            style={{ width: '100%', marginTop: 4 }}
          />
          <span>{element.rotation || 0}°</span>
        </>
      )}

      {/* 📝 TEXTO */}
      {element.type === 'texto' && (
        <>
          <h4>📝 Estilo del Texto</h4>

          <label>🎨 Color del texto:</label>
          <HexColorPicker
            color={element.style?.color || '#000000'}
            onChange={(color) => updateStyle({ color })}
          />

          <label>📏 Tamaño:</label>
          <input
            type="number"
            min={10}
            max={100}
            value={parseInt(String(element.style?.fontSize || '16'))}
            onChange={(e) =>
              updateStyle({ fontSize: parseInt(e.target.value) })
            }
          />

          <label>🅱️ Peso:</label>
          <select
            value={element.style?.fontWeight || 'normal'}
            onChange={(e) => updateStyle({ fontWeight: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="bold">Negrita</option>
            <option value="lighter">Ligero</option>
          </select>

          <label>✍️ Cursiva:</label>
          <select
            value={element.style?.fontStyle || 'normal'}
            onChange={(e) => updateStyle({ fontStyle: e.target.value })}
          >
            <option value="normal">No</option>
            <option value="italic">Sí</option>
          </select>

          <label>🔠 Alineación:</label>
          <select
            value={element.style?.textAlign || 'left'}
            onChange={(e) => updateStyle({ textAlign: e.target.value })}
          >
            <option value="left">Izquierda</option>
            <option value="center">Centro</option>
            <option value="right">Derecha</option>
          </select>

          <label>✏️ Contenido:</label>
          <textarea
            value={element.content || ''}
            onChange={(e) =>
              updateElement(selectedElement, { content: e.target.value })
            }
            rows={5}
            style={{ width: '100%' }}
          />

          <label>🔁 Rotación:</label>
          <input
            type="range"
            min={-180}
            max={180}
            value={element.rotation || 0}
            onChange={(e) =>
              updateElement(selectedElement, {
                rotation: parseInt(e.target.value)
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
                rotation: parseInt(e.target.value)
              })
            }
            style={{ width: '100%', marginTop: 4 }}
          />
          <span>{element.rotation || 0}°</span>
        </>
      )}

      {/* ⭐ ÍCONO */}
      {element.type === 'icono' && (
        <>
          <h4>⭐ Estilo del Ícono</h4>

          <label>🎨 Color:</label>
          <HexColorPicker
            color={element.style?.color || '#000000'}
            onChange={(color) => updateStyle({ color })}
          />

          <label>📏 Tamaño:</label>
          <input
            type="number"
            min={8}
            max={256}
            value={element.width ?? 32}
            onChange={(e) =>
              updateElement(selectedElement, {
                width: parseInt(e.target.value)
              })
            }
          />
          <span>{element.width ?? 32}px</span>

          <label>🔁 Rotación:</label>
          <input
            type="range"
            min={-180}
            max={180}
            value={element.rotation || 0}
            onChange={(e) =>
              updateElement(selectedElement, {
                rotation: parseInt(e.target.value)
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
                rotation: parseInt(e.target.value)
              })
            }
            style={{ width: '100%', marginTop: 4 }}
          />
          <span>{element.rotation || 0}°</span>
        </>
      )}

      {/* 🖼️ IMAGEN */}
      {element.type === 'imagen' && (
        <>
          <h4>🖼️ Estilo de Imagen</h4>

          <label>🔁 Rotación:</label>
          <input
            type="range"
            min={-180}
            max={180}
            value={element.rotation || 0}
            onChange={(e) =>
              updateElement(selectedElement, {
                rotation: parseInt(e.target.value)
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
                rotation: parseInt(e.target.value)
              })
            }
            style={{ width: '100%', marginTop: 4 }}
          />
          <span>{element.rotation || 0}°</span>

          <label>🔘 Bordes:</label>
          <select
            value={element.style?.borderRadius || '0px'}
            onChange={(e) => updateStyle({ borderRadius: e.target.value })}
          >
            <option value="0px">Cuadrada</option>
            <option value="10px">Ligero</option>
            <option value="25px">Medio</option>
            <option value="50%">Circular</option>
          </select>

          <label>📏 Ancho:</label>
          <input
            type="number"
            min={10}
            max={1000}
            value={element.width ?? 200}
            onChange={(e) =>
              updateElement(selectedElement, {
                width: parseInt(e.target.value)
              })
            }
          />

          <label>📐 Alto:</label>
          <input
            type="number"
            min={10}
            max={1000}
            value={element.height ?? 200}
            onChange={(e) =>
              updateElement(selectedElement, {
                height: parseInt(e.target.value)
              })
            }
          />
        </>
      )}

      {/* 🧩 MOSAICO */}
      {element.type === 'mosaico' && (
        <>
          <h4>🧩 Mosaico</h4>

          <label>📐 Columnas:</label>
          <input
            type="number"
            min={1}
            max={20}
            value={element.columns || 3}
            onChange={(e) =>
              updateElement(selectedElement, {
                columns: parseInt(e.target.value),
              })
            }
          />

          <label>📐 Espaciado:</label>
          <input
            type="number"
            min={0}
            max={100}
            value={element.spacing || 4}
            onChange={(e) =>
              updateElement(selectedElement, {
                spacing: parseInt(e.target.value),
              })
            }
          />
        </>
      )}
      {/* 🔗 ENLACE */}
      {element.type === 'enlace' && (
        <>
          <h4>🔗 Estilo del Enlace</h4>

          <label>🎨 Color:</label>
          <HexColorPicker
            color={element.style?.color || '#0000EE'}
            onChange={(color) => updateStyle({ color })}
          />

          <label>📏 Tamaño:</label>
          <input
            type="number"
            min={10}
            max={100}
            value={safeParse(element.style?.fontSize, 16)}
            onChange={(e) => updateStyle({ fontSize: parseInt(e.target.value) })}
          />

          <label>🅱️ Peso:</label>
          <select
            value={element.style?.fontWeight || 'normal'}
            onChange={(e) => updateStyle({ fontWeight: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="bold">Negrita</option>
            <option value="lighter">Ligero</option>
          </select>

          <label>✍️ Cursiva:</label>
          <select
            value={element.style?.fontStyle || 'normal'}
            onChange={(e) => updateStyle({ fontStyle: e.target.value })}
          >
            <option value="normal">No</option>
            <option value="italic">Sí</option>
          </select>

          <label>🔠 Alineación:</label>
          <select
            value={element.style?.textAlign || 'left'}
            onChange={(e) => updateStyle({ textAlign: e.target.value })}
          >
            <option value="left">Izquierda</option>
            <option value="center">Centro</option>
            <option value="right">Derecha</option>
          </select>

          <label>📝 Texto visible:</label>
          <input
            type="text"
            value={element.content || ''}
            onChange={(e) =>
              updateElement(selectedElement, { content: e.target.value })
            }
            style={{ width: '100%' }}
          />

          <label>🌐 URL:</label>
          <input
            type="text"
            value={element.href || ''}
            onChange={(e) =>
              updateElement(selectedElement, { href: e.target.value })
            }
            style={{ width: '100%' }}
            placeholder="https://tusueño.com"
          />

          <label>🔁 Rotación:</label>
          <input
            type="range"
            min={-180}
            max={180}
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
      {/* 🎥 VIDEO */}
      {element.type === 'video' && (
        <>
          <h4>🎥 Propiedades del Video</h4>

          <label>🌐 URL del video:</label>
          <input
            type="text"
            value={typeof element.content === 'string' ? element.content : ''}
            onChange={(e) =>
              updateElement(selectedElement, { content: e.target.value })
            }
            style={{ width: '100%' }}
            placeholder="https://www.youtube.com/embed/..."
          />

          <label>📏 Ancho:</label>
          <input
            type="number"
            min={100}
            max={2000}
            value={element.width ?? 300}
            onChange={(e) =>
              updateElement(selectedElement, { width: parseInt(e.target.value) })
            }
          />

          <label>📐 Alto:</label>
          <input
            type="number"
            min={100}
            max={2000}
            value={element.height ?? 200}
            onChange={(e) =>
              updateElement(selectedElement, { height: parseInt(e.target.value) })
            }
          />

          <label>🔁 Rotación:</label>
          <input
            type="range"
            min={-180}
            max={180}
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
