'use client';

import { createElement, type ReactElement } from 'react';
import { Headphones, Film, Camera, Pencil, Globe, type LucideIcon } from 'lucide-react';
import type { SocialKind } from '../types';

const ICONS: Record<SocialKind, LucideIcon> = {
  spotify: Headphones,
  youtube: Film,
  instagram: Camera,
  procesos: Pencil,
  web: Globe,
};

export const iconFor = (kind: SocialKind, size = 28): ReactElement => {
  const Cmp = ICONS[kind];
  // Nota: para props con guión en createElement usa clave string
  return createElement(Cmp, { size, 'aria-hidden': true });
};
