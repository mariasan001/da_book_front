import { useEditor } from "../../../../context/EditorContext";
import type { ElementoCV } from "../../../../types/types"; // Asegúrate del path

interface Props {
  id: string;
  refElement: React.RefObject<HTMLDivElement | null>;  
  element: ElementoCV;
  color: string;
  endX: number;
  endY: number;
}

export const RotationHandle = ({ id, refElement, element, color, endX, endY }: Props) => {
  const { updateElement } = useEditor();

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = refElement.current?.getBoundingClientRect();
    if (!rect) return;

    const originX = rect.left;
    const originY = rect.top + rect.height / 2;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - originX;
      const dy = moveEvent.clientY - originY;
      const angleRadians = Math.atan2(dy, dx);
      const angleDegrees = angleRadians * (180 / Math.PI);
      const newLength = Math.sqrt(dx * dx + dy * dy);
      const clampedLength = Math.max(20, Math.min(1000, newLength));

      updateElement(id, {
        width: clampedLength,
        style: {
          ...element.style,
          rotate: angleDegrees,
        },
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: endX - 5,
        top: endY - 5,
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: color,
        cursor: 'grab',
        zIndex: 10,
      }}
    />
  );
};
