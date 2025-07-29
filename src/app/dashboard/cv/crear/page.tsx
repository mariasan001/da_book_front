'use client';

import { EditorProvider } from './context/EditorContext';
import { ContextMenuProvider } from './context/ContextMenuContext';
import EditorCanvas from './components/EditorCanvas';
import EditorPanel from './components/Sidebar';
import ContextMenu from './components/ContextMenu';
import PropertyPanel from './components/PropertyPanel'; // 👈 Import del panel de propiedades

import './crear.css';

export default function CrearCV() {
  return (
    <ContextMenuProvider>
      <EditorProvider>
        <div className="crear-cv-layout">
          <EditorPanel />
          <EditorCanvas />
        </div>
        <ContextMenu />
      </EditorProvider>
    </ContextMenuProvider>
  );
}
