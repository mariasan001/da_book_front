'use client';

import { useMemo } from 'react';
import { useEditor } from '../../../../context/EditorContext';

export const useFlechaProps = () => {
  const { selectedElement, getElementById, updateElement } = useEditor();

  const element = useMemo(() => {
    if (!selectedElement) return null;
    const el = getElementById(selectedElement);
    return el?.type === 'flecha' ? el : null;
  }, [selectedElement, getElementById]);

  const updateStyle = (styleUpdates: Record<string, string | number>) => {
    if (!element) return;
    updateElement(element.id, {
      style: {
        ...element.style,
        ...styleUpdates,
      },
    });
  };

  const updateDimension = (dimension: 'width' | 'height', value: number) => {
    if (!element) return;
    updateElement(element.id, {
      ...element,
      [dimension]: value,
    });
  };

  return {
    element,
    updateStyle,
    updateDimension,
  };
};
