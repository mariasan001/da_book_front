import {
  LayoutTemplate,
  Minus,
  ArrowRight,
  Type,
  TextCursorInput,
  Smile,
  ImageIcon,
  GalleryHorizontalEnd,
  Link2,
  VideoIcon // 👈 nuevos íconos sugeridos para la sección visual
} from 'lucide-react';
import './EditorSidebar.css';
import { useState } from 'react';
import PropertyPanel from './PropertyPanel';
import { useEditor } from '../context/EditorContext';
import IconModal from './Bloques/iconos/components/IconModal';

export default function EditorPanel() {
  const { addElement } = useEditor();
  const [showIcons, setShowIcons] = useState(false); // ⬅️ Para el modal de íconos

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

      {/* 🔥 NUEVA SECCIÓN: muestra tu arte */}
      <span className="panel-section">Muestra tu arte</span>
      <div className="icon-grid">
        <button title="Imagen" onClick={() => addElement('imagen')}>
          <ImageIcon size={24} />
        </button>
        <button title="Mosaico de imágenes" onClick={() => addElement('mosaico')}>
          <GalleryHorizontalEnd size={24} />
        </button>
        <button title="Enlace" onClick={() => addElement('enlace')}>
          <Link2 size={24} />
        </button>
        <button title="Video" onClick={() => addElement('video')}>
          <VideoIcon size={24} />
        </button>
      </div>

      {/* Propiedades del elemento seleccionado */}
      <div className="properties-panel">
        <PropertyPanel />
      </div>

      {/* Modal para íconos */}
      {showIcons && <IconModal onClose={() => setShowIcons(false)} />}
    </section>
  );
}
