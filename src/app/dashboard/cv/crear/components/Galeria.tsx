'use client';

import { useEffect, useRef, useState } from 'react';
import type { Modo } from '@/app/dashboard/cv/crear/types/modo';
import { Plus, Trash2, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import styles from './Galeria.module.css';

type Item = {
  id: string;
  src: string;        
  title: string;
  desc: string;
  _objectUrl?: boolean; 
};

const uid = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const FIXED_QUOTE =
  'NO SOLO QUIERO QUE ESCUCHES MI MÚSICA... QUIERO QUE ESCUCHES MI VIAJE.';

export default function Galeria({ modo }: { modo?: Modo }) {
  const isVista = modo === 'vista';

  const [items, setItems] = useState<Item[]>([
    // Puedes dejarlo vacío; dejo 3 de ejemplo para ver el layout
    {
      id: uid(),
      src: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
      title: 'En vivo',
      desc: 'Show en festival local',
    },
    {
      id: uid(),
      src: 'https://images.unsplash.com/photo-1515202913167-d9a698095ebf?q=80&w=1200&auto=format&fit=crop',
      title: 'Estudio',
      desc: 'Grabación de guitarras',
    },
    {
      id: uid(),
      src: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1200&auto=format&fit=crop',
      title: 'Proceso',
      desc: 'Escritura y maquetas',
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Limpieza de objectURLs (cuando se quitan items o desmonta) ---
  useEffect(() => {
    return () => {
      items.forEach((it) => {
        if (it._objectUrl) URL.revokeObjectURL(it.src);
      });
    };
  }, [items]);

  const addFromFiles = (files: FileList) => {
    const news: Item[] = [];
    Array.from(files).forEach((f) => {
      const url = URL.createObjectURL(f);
      news.push({
        id: uid(),
        src: url,
        title: (f.name || 'Nueva imagen').replace(/\.[^.]+$/, ''),
        desc: '',
        _objectUrl: true,
      });
    });
    setItems((prev) => [...prev, ...news]);
  };

  const replaceImage = (id: string, file?: File) => {
    if (!file) return;
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        if (it._objectUrl) URL.revokeObjectURL(it.src);
        const url = URL.createObjectURL(file);
        return {
          ...it,
          src: url,
          _objectUrl: true,
          title: it.title || (file.name || 'Imagen').replace(/\.[^.]+$/, ''),
        };
      })
    );
  };

  const removeItem = (id: string) =>
    setItems((prev) => {
      const it = prev.find((x) => x.id === id);
      if (it?._objectUrl) URL.revokeObjectURL(it.src);
      return prev.filter((x) => x.id !== id);
    });

  const move = (id: string, dir: 'up' | 'down') =>
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id);
      const j = dir === 'up' ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const clone = [...prev];
      [clone[i], clone[j]] = [clone[j], clone[i]];
      return clone;
    });

  // ---- Render ----
  if (isVista) {
    return (
      <section className={styles.wrap} aria-label="Galería">
        <h2 className={styles.quote}>“{FIXED_QUOTE}”</h2>
        <ul className={styles.grid}>
          {items.map((it) => (
            <li key={it.id} className={styles.card}>
              <img
                src={it.src}
                alt={it.title || 'Imagen de la galería'}
                className={styles.img}
                loading="lazy"
              />
              {/* Overlay con título + descripción */}
              <div className={styles.overlay} tabIndex={0}>
                <div className={styles.meta}>
                  <strong className={styles.title}>{it.title}</strong>
                  {it.desc && <span className={styles.desc}>{it.desc}</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  // --- Modo editar ---
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
          <li key={it.id} className={styles.editItem}>
            <div className={styles.thumbCol}>
              <label className={styles.thumb}>
                <img src={it.src} alt="" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => replaceImage(it.id, e.target.files?.[0])}
                  style={{ display: 'none' }}
                />
                <span className={styles.thumbBtn}><Upload size={14} /> Cambiar</span>
              </label>
              <div className={styles.orderBtns}>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => move(it.id, 'up')}
                  disabled={i === 0}
                  title="Subir"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  className={styles.iconBtn}
                  onClick={() => move(it.id, 'down')}
                  disabled={i === items.length - 1}
                  title="Bajar"
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>

            <div className={styles.fields}>
              <label className={styles.label}>
                <span>Título</span>
                <input
                  className={styles.input}
                  value={it.title}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) => (x.id === it.id ? { ...x, title: e.target.value } : x))
                    )
                  }
                  placeholder="Nombre o idea de la imagen"
                />
              </label>

              <label className={styles.label}>
                <span>Descripción corta</span>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  value={it.desc}
                  onChange={(e) =>
                    setItems((prev) =>
                      prev.map((x) => (x.id === it.id ? { ...x, desc: e.target.value } : x))
                    )
                  }
                  placeholder="Contexto o emoción (opcional)"
                />
              </label>
            </div>

            <div className={styles.removeCol}>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeItem(it.id)}
                title="Eliminar"
                aria-label="Eliminar"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
