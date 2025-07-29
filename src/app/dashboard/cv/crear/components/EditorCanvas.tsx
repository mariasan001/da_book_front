import './EditorCanvas.css';
import { useEditor } from '../context/EditorContext';
import Linea from './Bloques/linea/Linea'; // Si ya tienes el componente de línea
import Contenedor from './Bloques/contenedor/Contenedor';

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
            // Aquí puedes agregar más tipos
            default:
              return null;
          }
        })
      )}
    </div>
  );
}
