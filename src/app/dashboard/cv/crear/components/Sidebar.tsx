'use client';

import './EditorSidebar.css';
import { useEditor } from '../context/EditorContext';
import PropertyPanel from './PropertyPanel';
import {
  LayoutTemplate,
  Minus,
  ArrowRight,
  Type,
  TextCursorInput,
} from 'lucide-react';

export default function EditorPanel() {
  const { addElement } = useEditor();

  return (
    <section className="editor-panel">
      <h3 className="panel-title">Piezas para tu creación</h3>
      <p className="panel-subtitle">Elige lo que quieras mostrar al mundo</p>

      {/* Sección de estructura */}
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
      </div>

      {/* Nueva sección de contenido */}
      <span className="panel-section">Dale voz a tu diseño</span>
      <div className="icon-grid">
        <button title="Título" onClick={() => addElement('titulo')}>
          <Type size={24} />
        </button>
        <button title="Texto" onClick={() => addElement('texto')}>
          <TextCursorInput size={24} />
        </button>
      </div>

      <div className="properties-panel">
        <PropertyPanel />
      </div>
    </section>
  );
}
