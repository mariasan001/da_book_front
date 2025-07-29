'use client';

import { HexColorPicker } from 'react-colorful';
import { ElementoCV } from '../../../types/types';
import { useEditor } from '../../../context/EditorContext';

interface Props {
  id: string;
  element: ElementoCV;
  setShowPanel: (show: boolean) => void;
  startPanelDrag: (e: React.MouseEvent) => void;
}

export default function ContenedorPanel({
  id,
  element,
  setShowPanel,
  startPanelDrag,
}: Props) {
  const { updateElement } = useEditor();

  const handleColorChange = (newColor: string) => {
    updateElement(id, {
      style: {
        ...element.style,
        backgroundColor: newColor,
      },
    });
  };

  return (
    <div
  className="panel"
  style={{
    position: 'absolute',
    left: (element.x ?? 0) + (element.width ?? 200) + 10,
    top: element.y ?? 0,
    padding: '12px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    zIndex: 1000,
  }}
  onMouseDown={startPanelDrag}
>
  <div style={{ marginBottom: '8px', fontWeight: 600 }}>
    🎨 Color de fondo
  </div>

  <HexColorPicker
    color={
      typeof element.style?.backgroundColor === 'string'
        ? element.style.backgroundColor
        : '#ffffff0d'
    }
    onChange={handleColorChange}
  />

  <button
    style={{
      marginTop: '10px',
      padding: '6px 12px',
      background: '#ddd',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
    onClick={() => setShowPanel(false)}
  >
    Cerrar panel
  </button>
</div>

  );
}
