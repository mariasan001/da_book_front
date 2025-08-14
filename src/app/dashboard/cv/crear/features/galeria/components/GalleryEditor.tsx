'use client';

import React, { useRef } from 'react';
import styles from '../Galeria.module.css';
import type { GalleryItem } from '../types';
import { Plus } from 'lucide-react';
import GalleryEditRow from './GalleryEditRow';
import { uid } from '../hooks/useUid';

const MAX = 6;

export default function GalleryEditor({
  items,
  onChange,
}: {
  items: GalleryItem[];
  onChange: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFromFiles = (files: FileList | File[]) => {
    onChange((prev) => {
      const remaining = Math.max(0, MAX - prev.length);
      if (remaining === 0) return prev;

      const picked = Array.from(files as any as File[]).slice(0, remaining);
      const news: GalleryItem[] = picked.map((f) => ({
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
    onChange((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        if (it._objectUrl) URL.revokeObjectURL(it.src); // limpia la anterior
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
    onChange((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) =>
    onChange((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it?._objectUrl) URL.revokeObjectURL(it.src);
      return prev.filter((x) => x.id !== id);
    });

  const move = (id: string, dir: 'up' | 'down') =>
    onChange((prev) => {
      const i = prev.findIndex((x) => x.id === id);
      const j = dir === 'up' ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const clone = [...prev];
      [clone[i], clone[j]] = [clone[j], clone[i]];
      return clone;
    });

  return (
    <section className={styles.wrap} aria-label="Editor de galería">
      <div className={styles.tools}>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={(e) => e.target.files && addFromFiles(e.target.files)}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus size={16} /> Subir imágenes
        </button>
      </div>

      <ul className={styles.editList}>
        {items.map((it, i) => (
          <GalleryEditRow
            key={it.id}
            item={it}
            index={i}
            total={items.length}
            onReplace={(file) => replaceImage(it.id, file)}
            onMove={(dir) => move(it.id, dir)}
            onRemove={() => removeItem(it.id)}
            onChangeTitle={(v) => updateItem(it.id, { title: v })}
            onChangeDesc={(v) => updateItem(it.id, { desc: v })}
          />
        ))}
      </ul>
    </section>
  );
}
