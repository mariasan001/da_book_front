'use client';

import styles from '../Educacion.module.css';
import type { Modo, AcadItem } from '../types';
import { Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { uid } from '../hooks/useUid';

export default function AcademicBlock({
  modo,
  items,
  onChange,
}: {
  modo: Modo;
  items: AcadItem[];
  onChange: (next: AcadItem[]) => void;
}) {
  const isVista = modo === 'vista';

  const add = () => onChange([...items, { id: uid(), texto: '' }]);
  const update = (id: string, texto: string) =>
    onChange(items.map(it => (it.id === id ? { ...it, texto } : it)));
  const remove = (id: string) => onChange(items.filter(it => it.id !== id));
  
const move = (id: string, dir: 'up' | 'down') => {
  const i = items.findIndex(x => x.id === id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= items.length) return;

  const clone = [...items];
  [clone[i], clone[j]] = [clone[j], clone[i]];
  onChange(clone);
};

  return (
    <div className={styles.block}>
      <strong className={styles.blockLabel}>Formación académica</strong>

      {isVista ? (
        <ul className={styles.acadList}>
          {items.map(it => (
            <li key={it.id} className={styles.acadBadge}>{it.texto}</li>
          ))}
        </ul>
      ) : (
        <>
          <div className={styles.tools}>
            <button type="button" className={styles.addBtn} onClick={add}>
              <Plus size={16} /> Agregar registro
            </button>
          </div>

          <ul className={styles.acadEditList}>
            {items.map((it, i) => (
              <li key={it.id} className={styles.acadEditItem}>
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

                <input
                  className={styles.input}
                  placeholder="Ej. Lic. en Música — Universidad X (Año)"
                  value={it.texto}
                  onChange={(e) => update(it.id, e.target.value)}
                />

                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => remove(it.id)}
                  aria-label="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
