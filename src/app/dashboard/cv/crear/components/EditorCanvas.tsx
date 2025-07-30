'use client';

import './EditorCanvas.css';
import { useEditor } from '../context/EditorContext';
import Linea from './Bloques/linea/Linea';
import Contenedor from './Bloques/contenedor/Contenedor';
import Titulo from './Bloques/titulo/Titulo';
import Texto from './Bloques/texto/Texto';
import Icono from './Bloques/iconos/Icono';
import Imagen from './Bloques/imagen/Imagen';
import Mosaico from './Bloques/imagen/Mosaico';

export default function EditorCanvas() {
  const { elements } = useEditor();

  return (
    <div className="editor-canvas">
      {elements.length === 0 ? (
        <p className="editor-placeholder">
          Arrastra tu componente aquí y empieza a crear tu mundo ✨
        </p>
      ) : (
        elements.map((el) => {
          switch (el.type) {
            case 'contenedor':
              return <Contenedor key={el.id} id={el.id} />;
            case 'linea':
              return <Linea key={el.id} id={el.id} />;
            case 'titulo':
              return <Titulo key={el.id} id={el.id} />;
            case 'texto':
              return <Texto key={el.id} id={el.id} />;
            case 'icono': // ✅ Nuevo case
              return <Icono key={el.id} id={el.id} />;
            default:
            case 'imagen':
              return <Imagen key={el.id} id={el.id} />;
            case 'mosaico':
              return <Mosaico key={el.id} id={el.id} />;

              return null;
          }
        })
      )}
    </div>
  );
}
