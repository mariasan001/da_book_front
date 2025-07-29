import './EditorCanvas.css';
import { useEditor } from '../context/EditorContext';
import Linea from './Bloques/linea/Linea';
import Contenedor from './Bloques/contenedor/Contenedor';
import Titulo from './Bloques/titulo/Titulo'; // 👈 Importa tu nuevo componente

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
            case 'titulo': // 👈 Agrega esto
              return <Titulo key={el.id} id={el.id} />;
            default:
              return null;
          }
        })
      )}
    </div>
  );
}
