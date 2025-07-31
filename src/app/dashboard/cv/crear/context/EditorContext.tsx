'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { EditorContextType, ElementoCV } from '../types/types';

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<ElementoCV[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addElement = (
    type: ElementoCV['type'],
    extraProps?: Partial<ElementoCV>
  ) => {
    const isLinea = type === 'linea';
    const isFlecha = type === 'flecha';
    const isTitulo = type === 'titulo';
    const isTexto = type === 'texto';
    const isIcono = type === 'icono';
    const isImagen = type === 'imagen';
    const isMosaico = type === 'mosaico';
    const isEnlace = type === 'enlace';
    const isVideo = type === 'video';

    const newEl: ElementoCV = {
      id: crypto.randomUUID(),
      type,
      content: isTitulo
        ? 'Nuevo Título'
        : isTexto
        ? '<p>Nuevo texto</p>'
        : isImagen
        ? extraProps?.content || 'https://via.placeholder.com/300x200'
        : isVideo
        ? extraProps?.content || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        : isEnlace
        ? extraProps?.content || 'https://tusitio.com'
        : '',

      ...(isFlecha && { direction: 'right' }), // 👈 fuera de style

      style: {
        ...(isTitulo && {
          fontSize: 32,
          fontWeight: 'bold',
          color: '#000000',
          backgroundColor: 'transparent'
        }),
        ...(isTexto && {
          fontSize: 16,
          fontWeight: 'normal',
          color: '#000000',
          backgroundColor: 'transparent',
          textAlign: 'left'
        }),
        ...(isIcono && { color: '#000000' }),
        ...(isImagen && { borderRadius: '8px' }),
        ...(isEnlace && {
          color: '#1E90FF',
          textDecoration: 'underline'
        }),
        ...(!isFlecha &&
          !isTitulo &&
          !isTexto &&
          !isIcono &&
          !isImagen &&
          !isEnlace &&
          !isVideo && {
            backgroundColor: '#000000',
            borderStyle: 'solid',
            borderRadius: '0px'
          })
      },

      width: isIcono
        ? 40
        : isLinea || isFlecha
        ? 200
        : isTitulo || isTexto
        ? 300
        : isImagen || isVideo || isMosaico
        ? 300
        : 150,

      height: isIcono
        ? 40
        : isLinea || isFlecha
        ? 4
        : isTitulo || isTexto
        ? 100
        : isImagen || isVideo || isMosaico
        ? 200
        : 100,

      x: 100,
      y: 100,

      ...(isIcono && { iconName: extraProps?.iconName || 'Smile' })
    };

    setElements((prev) => [...prev, newEl]);
  };

  const selectElement = (id: string) => {
    setSelectedElement(id);
  };

  const updateElementStyle = (prop: string, value: string | number) => {
    setElements((prev) =>
      prev.map((el) =>
        el.id === selectedElement
          ? {
              ...el,
              style: {
                ...(el.style ?? {}),
                [prop]: value
              }
            }
          : el
      )
    );
  };

  const updateElement = (id: string, updates: Partial<ElementoCV>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const deleteElement = (id: string) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (id: string) => {
    const original = elements.find((el) => el.id === id);
    if (!original) return;

    const duplicated: ElementoCV = {
      ...original,
      id: crypto.randomUUID(),
      x: (original.x ?? 100) + 20,
      y: (original.y ?? 100) + 20
    };

    setElements((prev) => [...prev, duplicated]);
  };

  const getElementById = (id: string): ElementoCV | undefined => {
    return elements.find((el) => el.id === id);
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
        duplicateElement,
        getElementById
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context)
    throw new Error('useEditor must be used within an EditorProvider');
  return context;
};
