'use client';

import { useEffect } from 'react';
import { LineaPanel } from './components/LineaPanel';
import { RotationHandle } from './components/RotationHandle';
import { updateElementStyle } from './utils/updateElementHelpers';
import { useLineaLogic } from './hook/useLineaLogic';
import { useLineaPanel } from './hook/useLineaPanel';
import { useAutoShowPanel } from './hook/useAutoShowPanel'; // 👈 Importas tu nuevo hook
import './Linea.css';

interface Props {
  id: string;
}

export default function Linea({ id }: Props) {
  const {
    element,
    ref,
    selectedElement,
    handleDrag,
    handleContextMenu,
    lineStyle,
    endX,
    endY,
    updateElement,
    selectElement,
  } = useLineaLogic(id);

  const {
    color,
    setColor,
    height,
    setHeight,
    borderStyle,
    setBorderStyle,
    borderRadius,
    setBorderRadius,
    showPanel,
    setShowPanel,
    panelPos,
    startPanelDrag,
  } = useLineaPanel(id, element);

  // ✨ Hook personalizado que controla si se muestra el panel
  useAutoShowPanel(selectedElement, id, setShowPanel);

  if (!element) return null;

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    updateElementStyle(updateElement, id, element, { backgroundColor: newColor });
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    updateElement(id, { height: val });
  };

  const handleBorderStyleChange = (val: 'solid' | 'dashed') => {
    setBorderStyle(val);
    updateElementStyle(updateElement, id, element, { borderStyle: val });
  };

  const handleBorderRadiusChange = (val: '0px' | '50px') => {
    setBorderRadius(val);
    updateElementStyle(updateElement, id, element, { borderRadius: val });
  };

  const handleClick = () => {
    selectElement(id);
  };

  return (
    <>
      <div
        ref={ref}
        onMouseDown={(e) => {
          handleDrag(e);
          handleClick();
        }}
        onContextMenu={handleContextMenu}
        className="linea"
        style={lineStyle(color, height, borderStyle, borderRadius)}
      />

      {selectedElement === id && (
        <>
          <RotationHandle
            id={id}
            refElement={ref as React.RefObject<HTMLDivElement>}
            element={element}
            color={color}
            endX={endX}
            endY={endY}
          />

          {showPanel && (
            <LineaPanel
              panelPos={panelPos}
              color={color}
              setColor={handleColorChange}
              height={height}
              setHeight={handleHeightChange}
              borderStyle={borderStyle}
              setBorderStyle={handleBorderStyleChange}
              borderRadius={borderRadius}
              setBorderRadius={handleBorderRadiusChange}
              onClose={() => setShowPanel(false)}
              onDragStart={startPanelDrag}
            />
          )}
        </>
      )}
    </>
  );
}
