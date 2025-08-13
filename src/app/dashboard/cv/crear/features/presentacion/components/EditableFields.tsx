'use client';

import React from 'react';

interface Props {
  nombre: string; setNombre: (v: string) => void;
  usuario: string; setUsuario: (v: string) => void;
  bio: string; setBio: (v: string) => void;
  pais: string; setPais: (v: string) => void;

  bioRef: React.Ref<HTMLTextAreaElement>;
  onHighlight: () => void;
  highlightMode: boolean; 
  classNames: {
    grid: string;
    label: string;
    bioWrapper: string;
    highlightBtn: string;
    inputPais: string;
  };
}

export default function EditableFields({
  nombre, setNombre,
  usuario, setUsuario,
  bio, setBio,
  pais, setPais,
  bioRef, onHighlight, highlightMode,
  classNames
}: Props) {
  const handleMouseUp = () => {
    if (highlightMode) onHighlight();
  };

  const handleKeyUp: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (!highlightMode) return;
    if (e.key === 'Enter' || e.key === ' ') onHighlight();
  };

  return (
    <div className={classNames.grid}>
      <div>
        <label className={classNames.label}>
          <span>Nombre artístico</span>
          <input
            placeholder="¿Cómo quieres que el mundo te recuerde?"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className={classNames.label}>
          <span>Usuario</span>
          <input
            placeholder="Tu @ o nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </label>

        <div className={classNames.bioWrapper}>
          <label className={classNames.label} htmlFor="bio">
            <span>Bio</span>
          </label>
          <textarea
            id="bio"
            ref={bioRef}
            placeholder="Tu descripción o bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            data-highlight={highlightMode}   // 🔔 para estilos cuando el modo está activo
            onMouseUp={handleMouseUp}        // 🖱️ soltar = subraya selección
            onKeyUp={handleKeyUp}            // ⌨️ Enter/Espacio = subraya selección
          />
          <button
            className={classNames.highlightBtn}
            type="button"
            onClick={onHighlight}
            title="Resaltar selección en la bio"
          >
            Subrayar
          </button>
        </div>

        <label className={classNames.label}>
          <span>🌍 País de residencia</span>
          <input
            className={classNames.inputPais}
            placeholder="País de residencia"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
