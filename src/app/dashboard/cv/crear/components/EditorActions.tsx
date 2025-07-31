'use client';

import './EditorActions.css';

interface Props {
  onVisualizar?: () => void;
  onGuardar?: () => void;
  onPublicar?: () => void;
}

export default function EditorActions({
  onVisualizar,
  onGuardar,
  onPublicar
}: Props) {
  return (
    <div className="editor-actions">
      <button className="btn-action visualize" onClick={onVisualizar}>
        Visualizar
      </button>
      <button className="btn-action save" onClick={onGuardar}>
        Guardar
      </button>
      <button className="btn-action publish" onClick={onPublicar}>
        Publicar
      </button>
    </div>
  );
}
