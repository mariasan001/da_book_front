'use client';

import styles from '../Educacion.module.css';
import type { Modo } from '../types';

export default function StoryBlock({
  modo,
  value,
  onChange,
}: {
  modo: Modo;
  value: string;
  onChange: (v: string) => void;
}) {
  const isVista = modo === 'vista';

  if (isVista) {
    return (
      <div className={styles.story}>
        {value.split('\n').map((line, i) => (
          <p key={i} className={styles.underlined}>{line}</p>
        ))}
      </div>
    );
  }

  return (
    <label className={styles.label}>
      <span>Historia (multilínea)</span>
      <textarea
        className={styles.textarea}
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cuenta tu recorrido, motivaciones, giros..."
      />
    </label>
  );
}
