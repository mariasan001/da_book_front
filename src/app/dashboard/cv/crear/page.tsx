'use client';

import { usePathname, useRouter } from 'next/navigation';
import { EditorProvider } from './context/EditorContext';
import { ContextMenuProvider } from './context/ContextMenuContext';
import EditorCanvas from './components/EditorCanvas';
import EditorPanel from './components/Sidebar';
import ContextMenu from './components/ContextMenu';
import './crear.css';

export default function CrearCV() {
  const pathname = usePathname();
  const router = useRouter();
  const isPreview = pathname.includes('visualizar');

  const handleVolverAEdicion = () => {
    const newPath = pathname.replace('/visualizar', '');
    router.push(newPath);
  };

  return (
    <ContextMenuProvider>
      <EditorProvider>
        <div className="crear-cv-layout">
          {!isPreview && <EditorPanel />}
          <EditorCanvas isPreview={isPreview} />
        </div>

        {!isPreview && <ContextMenu />}

        {isPreview && (
          <button className="btn-exit-preview" onClick={handleVolverAEdicion}>
            ← Volver a edición
          </button>
        )}
      </EditorProvider>
    </ContextMenuProvider>
  );
}
