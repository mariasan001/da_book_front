'use client';

import { ReactNode } from 'react';
import styles from './GlassWrapper.module.css';

interface Props {
  children: ReactNode;
}

export default function GlassWrapper({ children }: Props) {
  return (
    <div className={styles.glassWrapper}>
      <div className={styles.blurShape} />
      <div className={`${styles.blurShape} ${styles.alt}`} />
      <div className={`${styles.blurShape} ${styles.extra}`} />
      {children}
    </div>
  );
}
