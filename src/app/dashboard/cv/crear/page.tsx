'use client';

import { EditorProvider } from './context/EditorContext';
import { ContextMenuProvider } from './context/ContextMenuContext';
import EditorCanvas from './components/EditorCanvas';
import EditorPanel from './components/Sidebar';
import ContextMenu from './components/ContextMenu'; // ✅ ahora sí, mismo nombre y sin conflictos

import './crear.css';

export default function CrearCV() {
  return (
    <ContextMenuProvider>
      <EditorProvider>
        <div className="crear-cv-layout">
          <EditorPanel />
          <EditorCanvas />
        </div>
        <ContextMenu /> {/* ✅ menú contextual visual */}
      </EditorProvider>
    </ContextMenuProvider>
  );
}
