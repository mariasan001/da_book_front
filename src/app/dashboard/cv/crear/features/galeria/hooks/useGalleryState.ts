'use client';
import { useEffect, useState } from 'react';
import type { GalleryItem } from '../types';
import { uid } from './useUid';

export function useGalleryState(initial: GalleryItem[] = []) {
  const [items, setItems] = useState<GalleryItem[]>(initial);
  const MAX = 6; 
  // Limpieza de objectURLs al desmontar / cambiar
  useEffect(() => {
    return () => {
      items.forEach(it => { if (it._objectUrl) URL.revokeObjectURL(it.src); });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
const addFromFiles = (files: FileList | File[]) => {
  setItems((prev) => {
    const remaining = Math.max(0, MAX - prev.length);
    if (remaining === 0) return prev;

    const arr = Array.from(files as any as File[]).slice(0, remaining);
    const news: GalleryItem[] = arr.map((f) => ({
      id: uid(),
      src: URL.createObjectURL(f),
      title: (f.name || 'Imagen').replace(/\.[^.]+$/, ''),
      desc: '',
      _objectUrl: true,
    }));
    return [...prev, ...news];
  });
};

  const replaceImage = (id: string, file?: File) => {
    if (!file) return;
    setItems(prev =>
      prev.map(it => {
        if (it.id !== id) return it;
        if (it._objectUrl) URL.revokeObjectURL(it.src);
        const url = URL.createObjectURL(file);
        return {
          ...it,
          src: url,
          _objectUrl: true,
          title: it.title || (file.name || 'Imagen').replace(/\.[^.]+$/, ''),
        };
      }),
    );
  };

  const updateItem = (id: string, patch: Partial<GalleryItem>) =>
    setItems(prev => prev.map(it => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) =>
    setItems(prev => {
      const it = prev.find(x => x.id === id);
      if (it?._objectUrl) URL.revokeObjectURL(it.src);
      return prev.filter(x => x.id !== id);
    });

  const move = (id: string, dir: 'up' | 'down') =>
    setItems(prev => {
      const i = prev.findIndex(x => x.id === id);
      const j = dir === 'up' ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const clone = [...prev];
      [clone[i], clone[j]] = [clone[j], clone[i]];
      return clone;
    });

  return { items, setItems, addFromFiles, replaceImage, updateItem, removeItem, move };
}
