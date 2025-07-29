import './Texto.css';
import { useEditor } from '../../context/EditorContext';

type Props = {
  id: string;
};

export default function Texto({ id }: Props) {
  const { elements, selectElement } = useEditor();

  const element = elements.find(el => el.id === id);

  if (!element) return null; // Evita renderizar si no encuentra el elemento

  return (
    <div
      className="bloque-texto"
      contentEditable
      suppressContentEditableWarning
      onClick={() => selectElement(id)}
      style={element.style}
    >
      {element.content || "Escribe aquí..."}
    </div>
  );
}
