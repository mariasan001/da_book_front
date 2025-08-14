'use client';

import React from 'react';
import styles from '../Galeria.module.css';
import { ArrowDown, ArrowUp, Trash2, Upload } from 'lucide-react';
import type { GalleryItem } from '../types';

type Props = {
  item: GalleryItem;
  index: number;
  total: number;
  onChangeTitle: (v: string) => void;
  onChangeDesc: (v: string) => void;
  onReplace: (file?: File) => void;
  onMove: (dir: 'up' | 'down') => void;
  onRemove: () => void;
};

export default function GalleryEditRow({
  item, index, total, onChangeTitle, onChangeDesc, onReplace, onMove, onRemove,
}: Props) {
  return (
    <li className={styles.editItem}>
      <div className={styles.thumbCol}>
        <label className={styles.thumb}>
          <img src={item.src} alt="" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onReplace(e.target.files?.[0])}
            style={{ display: 'none' }}
          />
          <span className={styles.thumbBtn}><Upload size={14} /> Cambiar</span>
        </label>

        <div className={styles.orderBtns}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onMove('up')}
            disabled={index === 0}
            title="Subir"
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => onMove('down')}
            disabled={index === total - 1}
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
            value={item.title}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="Nombre o idea de la imagen"
          />
        </label>

        <label className={styles.label}>
          <span>Descripción corta</span>
          <textarea
            className={styles.textarea}
            rows={2}
            value={item.desc}
            onChange={(e) => onChangeDesc(e.target.value)}
            placeholder="Contexto o emoción (opcional)"
          />
        </label>
      </div>

      <div className={styles.removeCol}>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={onRemove}
          title="Eliminar"
          aria-label="Eliminar"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}
