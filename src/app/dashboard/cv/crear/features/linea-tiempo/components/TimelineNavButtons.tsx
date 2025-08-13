'use client';
import React from 'react';
import styles from '../LineaDeTiempo.module.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TimelineNavButtons({
  canPrev, canNext, onPrev, onNext,
}: {
  canPrev: boolean; canNext: boolean;
  onPrev: () => void; onNext: () => void;
}) {
  return (
    <>
      <button type="button" className={`${styles.navBtn} ${styles.left}`} onClick={onPrev} disabled={!canPrev}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" className={`${styles.navBtn} ${styles.right}`} onClick={onNext} disabled={!canNext}>
        <ChevronRight size={20} />
      </button>
    </>
  );
}
