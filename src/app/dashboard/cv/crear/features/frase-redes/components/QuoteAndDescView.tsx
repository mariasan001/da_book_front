'use client';
import React from 'react';
import styles from '../FraseYRedes.module.css';

export default function QuoteAndDescView({
  frase, descripcion,
}: { frase: string; descripcion: string }) {
  return (
    <>
      <h2 className={styles.quote}>{frase}</h2>
      <p className={styles.desc}>{descripcion}</p>
    </>
  );
}
