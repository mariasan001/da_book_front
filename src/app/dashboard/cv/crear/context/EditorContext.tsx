'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { EditorContextType, ElementoCV } from '../types/types';

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<ElementoCV[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addElement = (type: ElementoCV['type']) => {
    const isLinea = type === 'linea';
    const newEl: ElementoCV = {
      id: crypto.randomUUID(),
      type,
      content: '',
      style: {
        backgroundColor: '#000000',
      },
      width: isLinea ? 200 : 150,
      height: isLinea ? 4 : 100,
      x: 100,
      y: 100,
    };
    setElements(prev => [...prev, newEl]);
  };

  const selectElement = (id: string) => {
    setSelectedElement(id);
  };

  const updateElementStyle = (prop: string, value: string | number) => {
    setElements(prev =>
      prev.map(el =>
        el.id === selectedElement
          ? {
              ...el,
              style: {
                ...(el.style ?? {}),
                [prop]: value,
              },
            }
          : el
      )
    );
  };

  const updateElement = (id: string, updates: Partial<ElementoCV>) => {
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (id: string) => {
    const original = elements.find(el => el.id === id);
    if (!original) return;

    const duplicated: ElementoCV = {
      ...original,
      id: crypto.randomUUID(),
      x: (original.x ?? 100) + 20,
      y: (original.y ?? 100) + 20,
    };

    setElements(prev => [...prev, duplicated]);
  };

  const getElementById = (id: string): ElementoCV | undefined => {
    return elements.find(el => el.id === id);
  };

  return (
    <EditorContext.Provider
      value={{
        elements,
        addElement,
        selectedElement,
        selectElement,
        updateElementStyle,
        updateElement,
        deleteElement,
        duplicateElement, // 👈 AÑADIDO AQUÍ
        getElementById,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within an EditorProvider');
  return context;
};
