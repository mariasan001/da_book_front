'use client';

import { useEffect, useRef, useState } from 'react';
import type { Modo } from '@/app/dashboard/cv/crear/types/modo';
import { Plus, Trash2, ArrowUp, ArrowDown, Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './LineaDeTiempo.module.css';

const FIXED_QUOTE = 'El arte no se hizo para guardarse: se hizo para compartirse.';

const uid = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

type TimelineItem = {
  id: string;
  fecha: string;
  titulo: string;
  descripcion?: string;
  enlace?: string;
};

export default function LineaDeTiempo({ modo }: { modo?: Modo }) {
  const isVista = modo === 'vista';

  const [items, setItems] = useState<TimelineItem[]>([
    { id: uid(), fecha: '2023', titulo: 'Festival de Música Emergente - CDMX (2023)' },
    { id: uid(), fecha: '2023', titulo: 'Sesiones en vivo: “Mic Abierto Experimental” - Toluca' },
    { id: uid(), fecha: '2022', titulo: 'Colaboración sonora en cortometraje “Sombras del Alma” (2022)' },
    { id: uid(), fecha: '—',    titulo: 'Talleres de creación musical en escuelas secundarias' },
  ]);

  // --- Scroll horizontal: 4 tarjetas por “pantalla” ---
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = viewportRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollByPage = (dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: 'smooth' });
  };

  useEffect(() => {
    updateArrows();
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [items.length]);

  const addItem = () =>
    setItems(p => [...p, { id: uid(), fecha: '', titulo: '', descripcion: '', enlace: '' }]);

  const updateItem = (id: string, patch: Partial<TimelineItem>) =>
    setItems(p => p.map(it => (it.id === id ? { ...it, ...patch } : it)));

  const removeItem = (id: string) => setItems(p => p.filter(it => it.id !== id));

  const move = (id: string, dir: 'up' | 'down') =>
    setItems(p => {
      const i = p.findIndex(it => it.id === id);
      const j = dir === 'up' ? i - 1 : i + 1;
      if (i < 0 || j < 0 || j >= p.length) return p;
      const clone = [...p];
      [clone[i], clone[j]] = [clone[j], clone[i]];
      return clone;
    });

  if (isVista) {
    return (
      <section className={styles.wrap} aria-label="Línea de tiempo">
        <h2 className={styles.quote}>“{FIXED_QUOTE}”</h2>

        <div className={styles.viewport} ref={viewportRef}>
          {/* línea continua detrás */}
          <div className={styles.track}>
            <ul className={styles.steps}>
              {items.map((it, idx) => (
                <li key={it.id} className={styles.step}>
                  <div className={styles.index}>{String(idx + 1).padStart(2, '0')}</div>
                  <div className={styles.dot} aria-hidden />
                  <p className={styles.caption}>{it.titulo}</p>
                  {it.enlace && it.enlace.trim() && (
                    <a className={styles.link} href={it.enlace} target="_blank" rel="noopener noreferrer">
                      <LinkIcon size={14} /> Ver más
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* flechas solo si hay más de 4 */}
          {items.length > 4 && (
            <>
              <button
                type="button"
                className={`${styles.navBtn} ${styles.left}`}
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label="Ver anteriores"
                title="Anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className={`${styles.navBtn} ${styles.right}`}
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label="Ver siguientes"
                title="Siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

  // --- Editor ---
  return (
    <section className={styles.wrap} aria-label="Editor de línea de tiempo">
      <div className={styles.tools}>
        <button type="button" className={styles.addBtn} onClick={addItem}>
          <Plus size={16} /> Agregar evento
        </button>
      </div>

      <ul className={styles.editList}>
        {items.map((it, i) => (
          <li key={it.id} className={styles.editItem}>
            <div className={styles.orderBtns}>
              <button type="button" className={styles.iconBtn} onClick={() => move(it.id, 'up')} disabled={i === 0} title="Subir">
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

            <div className={styles.fields}>
              <label className={styles.label}>
                <span>Fecha</span>
                <input
                  className={styles.input}
                  placeholder="2024 / Jun 2024 / 10-05-2024"
                  value={it.fecha}
                  onChange={(e) => updateItem(it.id, { fecha: e.target.value })}
                />
              </label>

              <label className={styles.label}>
                <span>Título</span>
                <input
                  className={styles.input}
                  placeholder="Evento / logro / publicación…"
                  value={it.titulo}
                  onChange={(e) => updateItem(it.id, { titulo: e.target.value })}
                />
              </label>

              <label className={styles.label}>
                <span>Descripción (opcional)</span>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  placeholder="Detalles…"
                  value={it.descripcion}
                  onChange={(e) => updateItem(it.id, { descripcion: e.target.value })}
                />
              </label>

              <label className={styles.label}>
                <span>Enlace (opcional)</span>
                <input
                  className={styles.input}
                  placeholder="https://..."
                  value={it.enlace}
                  onChange={(e) => updateItem(it.id, { enlace: e.target.value })}
                />
              </label>
            </div>

            <div className={styles.removeCol}>
              <button type="button" className={styles.removeBtn} onClick={() => removeItem(it.id)} title="Eliminar" aria-label="Eliminar">
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
