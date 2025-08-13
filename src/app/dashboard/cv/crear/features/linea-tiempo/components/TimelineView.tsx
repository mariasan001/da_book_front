'use client';
import React from 'react';
import styles from '../LineaDeTiempo.module.css';
import { useHorizontalPager } from '../hooks/useHorizontalPager';
import type { TimelineItem } from '../types';
import { Link as LinkIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { isNonEmptyUrl } from '../utils/url';

const FIXED_QUOTE = 'El arte no se hizo para guardarse: se hizo para compartirse.';

export default function TimelineView({
  items,
  quote = FIXED_QUOTE,
}: {
  items: TimelineItem[];
  quote?: string;
}) {
  const { viewportRef, canPrev, canNext, scrollByPage } = useHorizontalPager(items.length);

  return (
    <section className={styles.wrap} aria-label="Línea de tiempo">
      <h2 className={styles.quote}>“{quote}”</h2>

      <div className={styles.viewport} ref={viewportRef}>
        {/* línea continua detrás */}
        <div className={styles.track}>
          <ul className={styles.steps}>
            {items.map((it, idx) => (
              <li key={it.id} className={styles.step}>
                <div className={styles.index}>{String(idx + 1).padStart(2, '0')}</div>
                <div className={styles.dot} aria-hidden />
                <p className={styles.caption}>
                  {it.titulo}
                  {it.fecha ? <span className={styles.date}> · {it.fecha}</span> : null}
                </p>
                {isNonEmptyUrl(it.enlace) && (
                  <a
                    className={styles.link}
                    href={it.enlace!.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon size={14} /> Ver más
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

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
