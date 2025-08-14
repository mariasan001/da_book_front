'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Modo, GalleryItem } from '../types';
import GalleryView from './GalleryView';
import GalleryEditor from './GalleryEditor';
import { uid } from '../hooks/useUid';

const DEFAULT_ITEMS: GalleryItem[] = [
  { id: uid(), src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop', title: 'En vivo',   desc: 'Show en festival local' },
  { id: uid(), src: 'https://images.unsplash.com/photo-1515202913167-d9a698095ebf?q=80&w=1200&auto=format&fit=crop', title: 'Estudio', desc: 'Grabación de guitarras' },
  { id: uid(), src: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop', title: 'Proceso', desc: 'Escritura y maquetas' },
];

export default function Gallery({
  modo = 'editar',
  initial = DEFAULT_ITEMS,
  quote,
}: {
  modo?: Modo;
  initial?: GalleryItem[];
  quote?: string;
}) {
  const [items, setItems] = useState<GalleryItem[]>(initial);

  // 👉 mantener la versión más reciente en un ref
  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  // ✅ Revocar objectURLs SOLO cuando se desmonte TODA la galería
  useEffect(() => {
    return () => {
      for (const it of itemsRef.current) {
        if (it._objectUrl) URL.revokeObjectURL(it.src);
      }
    };
  }, []);

  return modo === 'vista'
    ? <GalleryView items={items} quote={quote} />
    : <GalleryEditor items={items} onChange={setItems} />;
}
