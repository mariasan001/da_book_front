import {
  LayoutTemplate,
  Minus,
  ArrowRight,
  Type,
  TextCursorInput,
  Smile // ¡Usamos Smile como ícono representativo!
} from 'lucide-react';
import './EditorSidebar.css';
import { useState } from 'react';
import PropertyPanel from './PropertyPanel';
import { useEditor } from '../context/EditorContext';
import IconModal from './Bloques/iconos/components/IconModal';

export default function EditorPanel() {
  const { addElement } = useEditor();
  const [showIcons, setShowIcons] = useState(false); // ⬅️ Para controlar el modal

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

      {/* Sección de contenido */}
      <span className="panel-section">Dale voz a tu diseño</span>
      <div className="icon-grid">
        <button title="Título" onClick={() => addElement('titulo')}>
          <Type size={24} />
        </button>
        <button title="Texto" onClick={() => addElement('texto')}>
          <TextCursorInput size={24} />
        </button>
        <button title="Íconos" onClick={() => setShowIcons(true)}>
          <Smile size={24} />
        </button>
      </div>

      <div className="properties-panel">
        <PropertyPanel />
      </div>

      {/* Modal de íconos */}
      {showIcons && <IconModal onClose={() => setShowIcons(false)} />}
    </section>
  );
}
