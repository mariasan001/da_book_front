'use client';
import { useMemo, createElement, type ReactNode } from 'react';

/** Renderiza la bio con [mark]...[/mark] como spans (sin JSX) */
export function useBioMarks(bio: string, markedClassName: string): ReactNode[] {
  return useMemo<ReactNode[]>(() => {
    const parts = bio.split(/(\[mark\]|\[\/mark\])/g);
    let isMarked = false;
    const out: ReactNode[] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part === '[mark]') { isMarked = true; continue; }
      if (part === '[/mark]') { isMarked = false; continue; }
      if (!part) continue;

      out.push(
        isMarked
          ? createElement('span', { key: i, className: markedClassName }, part)
          : createElement('span', { key: i }, part)
      );
    }
    return out;
  }, [bio, markedClassName]);
}

/** Inserta [mark]...[/mark] en el texto seleccionado de un <textarea> */
export function highlightSelectionInBio(
  textarea: HTMLTextAreaElement | null,
  bio: string,
  setBio: (v: string) => void
) {
  if (!textarea) return;
  const { selectionStart = 0, selectionEnd = 0 } = textarea;
  if (selectionStart === selectionEnd) return;

  const before = bio.slice(0, selectionStart);
  const selected = bio.slice(selectionStart, selectionEnd);
  const after = bio.slice(selectionEnd);

  setBio(`${before}[mark]${selected}[/mark]${after}`);
  requestAnimationFrame(() => textarea.focus());
}
