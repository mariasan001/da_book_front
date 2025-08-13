'use client';
import { useEffect, useRef, useState } from 'react';

export function useHorizontalPager(depCount = 0) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = viewportRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollByPage = (dir: 1 | -1) => {
    const el = viewportRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * dir, behavior: 'smooth' });
  };

  useEffect(() => {
    updateArrows();
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    const onResize = () => updateArrows();
    el.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depCount]);

  return { viewportRef, canPrev, canNext, scrollByPage };
}
