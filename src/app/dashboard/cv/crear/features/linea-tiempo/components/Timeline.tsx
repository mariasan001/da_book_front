'use client';
import React, { useMemo } from 'react';
import type { Modo, TimelineItem } from '../types';
import TimelineView from './TimelineView';
import TimelineEditor from './TimelineEditor';
import { uid } from '../hooks/useUid';

const DEFAULT_ITEMS: TimelineItem[] = [
  { id: uid(), fecha: '2023', titulo: 'Festival de Música Emergente - CDMX (2023)' },
  { id: uid(), fecha: '2023', titulo: 'Sesiones en vivo: “Mic Abierto Experimental” - Toluca' },
  { id: uid(), fecha: '2022', titulo: 'Colaboración sonora en cortometraje “Sombras del Alma” (2022)' },
  { id: uid(), fecha: '—',    titulo: 'Talleres de creación musical en escuelas secundarias' },
];

export default function Timeline({
  modo = 'editar',
  initial = DEFAULT_ITEMS,
}: {
  modo?: Modo;
  initial?: TimelineItem[];
}) {
  const items = useMemo(() => initial, [initial]);
  return modo === 'vista'
    ? <TimelineView items={items} />
    : <TimelineEditor initial={items} />;
}
