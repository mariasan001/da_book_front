'use client';

import styles from './floating-fab.module.css';

export default function FloatingFab({
  modo,
  onToggle,
}: {
  modo: 'editar' | 'vista';
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.fab}
      aria-label={modo === 'editar' ? 'Cambiar a vista' : 'Cambiar a edición'}
      onClick={onToggle}
      title={modo === 'editar' ? 'Vista' : 'Editar'}
    >
      {modo === 'editar' ? '👁️' : '✏️'}
    </button>
  );
}
