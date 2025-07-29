'use client';

import { HexColorPicker } from 'react-colorful';
import { useFlechaPanel } from '../hook/useFlechaPanel';

export default function FlechaPanel() {
  const {
    color,
    onColorChange,
    grosor,
    onGrosorChange,
    direccion,
    onDireccionChange
  } = useFlechaPanel();

  return (
    <div className="property-panel-embedded">
      <h4>🎨 Color de la flecha</h4>
      <HexColorPicker color={color} onChange={onColorChange} />

      <label style={{ display: 'block', marginTop: 12 }}>📏 Grosor:</label>
      <input
        type="range"
        min={1}
        max={20}
        value={grosor}
        onChange={onGrosorChange}
        style={{ width: '100%' }}
      />
      <span>{grosor}px</span>

      <label style={{ display: 'block', marginTop: 12 }}>➡ Dirección:</label>
      <select
        value={direccion}
        onChange={onDireccionChange}
        style={{ width: '100%' }}
      >
        <option value="derecha">➡ Derecha</option>
        <option value="izquierda">⬅ Izquierda</option>
        <option value="arriba">⬆ Arriba</option>
        <option value="abajo">⬇ Abajo</option>
      </select>
    </div>
  );
}
