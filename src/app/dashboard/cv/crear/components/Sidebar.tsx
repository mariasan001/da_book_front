'use client';
import './EditorSidebar.css';
import { useEditor } from '../context/EditorContext';
import {
  LayoutTemplate, Minus, ArrowRight, Square,
  RectangleHorizontal, Circle
} from 'lucide-react';

export default function EditorPanel() {
  const { addElement, toggleCanvasColor, canvasColor } = useEditor();

  return (
    <section className="editor-panel">
      <h3 className="panel-title">Piezas para tu creación</h3>
      <p className="panel-subtitle">Elige lo que quieras mostrar al mundo</p>

      <span className="panel-section">Dale estructura</span>
      <div className="icon-grid">
        <button title="Contenedor" onClick={() => addElement('contenedor')}>
          <LayoutTemplate size={24} />
        </button>
        <button title="Línea" onClick={() => addElement('linea')}>
          <Minus size={24} />
        </button>
        <button title="Flecha" onClick={() => addElement('flecha')}>
          <ArrowRight size={24} />
        </button>
        <button title="Cuadrado" onClick={() => addElement('cuadrado')}>
          <Square size={24} />
        </button>
        <button title="Rectángulo" onClick={() => addElement('rectangulo')}>
          <RectangleHorizontal size={24} />
        </button>
        <button title="Círculo" onClick={() => addElement('circulo')}>
          <Circle size={24} />
        </button>
        {/* Botón para cambiar color de fondo */}
        <button title="Color de fondo" onClick={toggleCanvasColor}>
          <div className="color-preview" style={{ backgroundColor: canvasColor }} />
        </button>
      </div>
    </section>
  );
}
