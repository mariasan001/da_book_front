'use client';

import './EditorCanvas.css';
import { useEditor } from '../context/EditorContext';
import { useRouter } from 'next/navigation';

import Linea from './Bloques/linea/Linea';
import Contenedor from './Bloques/contenedor/Contenedor';
import Titulo from './Bloques/titulo/Titulo';
import Texto from './Bloques/texto/Texto';
import Icono from './Bloques/iconos/Icono';
import Imagen from './Bloques/imagen/Imagen';
import Mosaico from './Bloques/imagen/Mosaico';
import Enlace from './Bloques/enlaces/enlaces';
import Video from './Bloques/video/video';

interface Props {
  isPreview?: boolean; // Si estamos en modo visualización
}

export default function EditorCanvas({ isPreview = false }: Props) {
  const { elements } = useEditor();
  const router = useRouter();

  return (
    <div className={`editor-canvas ${isPreview ? 'preview-mode' : ''}`}>
      {isPreview && (
        <button
          className="btn-flotante-regresar"
          onClick={() => router.push('/dashboard/cv/crear')}
        >
          ⬅️ Volver a edición
        </button>
      )}

      {elements.length === 0 ? (
        <p className="editor-placeholder">
          {isPreview
            ? 'Aún no hay contenido que mostrar.'
            : 'Arrastra tu componente aquí y empieza a crear tu mundo ✨'}
        </p>
      ) : (
        elements.map((el) => {
          const props = {
            id: el.id,
            isPreview
          };
          
          switch (el.type) {
            case 'contenedor':
              return <Contenedor key={el.id} {...props} />;
            case 'linea':
              return <Linea key={el.id} {...props} />;
            case 'titulo':
              return <Titulo key={el.id} {...props} />;
            case 'texto':
              return <Texto key={el.id} {...props} />;
            case 'icono':
              return <Icono key={el.id} {...props} />;
            case 'imagen':
              return <Imagen key={el.id} {...props} />;
            case 'mosaico':
              return <Mosaico key={el.id} {...props} />;
            case 'enlace':
              return <Enlace key={el.id} {...props} element={el} />;
            case 'video':
              return <Video key={el.id} {...props} element={el} />;
            default:
              return null;
          }
        })
      )}
    </div>
  );
}
