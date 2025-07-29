'use client';
import './EditorPanel.css';
import { useEditor } from '../context/EditorContext';
import { Text, Type } from 'lucide-react';

export default function EditorPanel() {
  const { addElement } = useEditor();

  return (
    <aside className="editor-panel">
      <h3 className="panel-title">Piezas para tu creación</h3>
      <p className="panel-subtitle">Elige lo que quieras mostrar al mundo</p>

      <div className="icon-grid">
        <button title="Texto" onClick={() => addElement('texto')}><Text /></button>
        <button title="Título" onClick={() => addElement('titulo')}><Type /></button>
      </div>
    </aside>
  );
}
