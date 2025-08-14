'use client';

import React from 'react';
import styles from '../Galeria.module.css';
import type { GalleryItem } from '../types';

const DEFAULT_QUOTE =
  'NO SOLO QUIERO QUE ESCUCHES MI MÚSICA... QUIERO QUE ESCUCHES MI VIAJE.';

const HIGHLIGHT = 'QUIERO QUE ESCUCHES MI VIAJE.';

function Quote({ text = DEFAULT_QUOTE }: { text?: string }) {
  const before = text.replace(HIGHLIGHT, '').replace(/”|“/g, '');
  return (
    <h2 className={styles.quote}>
      “{before}
      <span className={styles.accent}>{HIGHLIGHT}</span>
      ”
    </h2>
  );
}

export default function GalleryView({
  items,
  quote = DEFAULT_QUOTE,
}: {
  items: GalleryItem[];
  quote?: string;
}) {
  // Solo mostramos hasta 6 imágenes en un grid 3x2
  const visible = (items ?? []).slice(0, 6);
  if (!visible.length) return null;

  return (
    <section className={styles.wrap} aria-label="Galería">
      <Quote text={quote} />
      <ul className={`${styles.grid} ${styles.grid3x2}`} role="list">
        {visible.map((it) => (
          <li key={it.id} className={styles.card}>
            <img
              src={it.src}
              alt={it.title || 'Imagen de la galería'}
              className={styles.img}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
