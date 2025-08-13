import type { TimelineItem } from '../types';

export const moveItem = (arr: TimelineItem[], id: string, dir: 'up' | 'down') => {
  const i = arr.findIndex(it => it.id === id);
  const j = dir === 'up' ? i - 1 : i + 1;
  if (i < 0 || j < 0 || j >= arr.length) return arr;
  const clone = [...arr];
  [clone[i], clone[j]] = [clone[j], clone[i]];
  return clone;
};
