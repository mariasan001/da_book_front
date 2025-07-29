import { useEditor } from "../../../../context/EditorContext";

export function useFlechaPanel() {
  const { selectedElement, getElementById, updateElement } = useEditor();

  const element = selectedElement ? getElementById(selectedElement) : null;

  const style = element?.style ?? {};

  const color = typeof style.backgroundColor === 'string'
    ? style.backgroundColor
    : '#000000';

  const grosor = typeof element?.height === 'number' ? element.height : 2;

  const direccion = (style.direccion || 'derecha') as 'izquierda' | 'derecha' | 'arriba' | 'abajo';

  const onColorChange = (newColor: string) => {
    if (!selectedElement) return;
    updateElement(selectedElement, {
      style: {
        ...style,
        backgroundColor: newColor
      }
    });
  };

  const onGrosorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    updateElement(selectedElement, {
      height: parseInt(e.target.value)
    });
  };

  const onDireccionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedElement) return;
    updateElement(selectedElement, {
      style: {
        ...style,
        direccion: e.target.value
      }
    });
  };

  return {
    color,
    onColorChange,
    grosor,
    onGrosorChange,
    direccion,
    onDireccionChange
  };
}
