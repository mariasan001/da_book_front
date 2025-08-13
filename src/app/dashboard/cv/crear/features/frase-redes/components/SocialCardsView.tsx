'use client';

import React from 'react';
import styles from '../FraseYRedes.module.css';
import type { Social } from '../types';
import { iconFor } from '../utils/icons';

type Props = {
  redes: Social[];
  /** Resalta la primera tarjeta (gradiente). Por defecto: true */
  highlightFirst?: boolean;
};

const hasUrl = (u?: string) => !!u && !!u.trim();

export default function SocialCardsView({ redes, highlightFirst = true }: Props) {
  const visibles = redes.filter(r => hasUrl(r.url));
  const count = visibles.length;
  if (count === 0) return null;

  return (
    <ul className={`${styles.cardGrid} ${styles[`grid-${count}`] ?? ''}`} role="list">
      {visibles.map((r, idx) => {
        const isPrimary = highlightFirst && idx === 0;
        return (
          <li key={r.id}>
            <a
              className={`${styles.card} ${isPrimary ? styles.cardPrimary : ''}`}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={r.label}
            >
              <div className={styles.cardIcon}>{iconFor(r.tipo, 28)}</div>
              <div className={styles.cardText} title={r.label}>{r.label}</div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
