import { useEffect, useRef, useState } from 'react';

/**
 * Maneja carga de imagen desde <input type="file"> con objectURL seguro
 * (revoca el URL anterior y al desmontar).
 */
export function useObjectUrlImage(initial: string) {
  const [src, setSrc] = useState(initial);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastObjectUrl = useRef<string | null>(null);

  const openFileDialog = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
    const url = URL.createObjectURL(file);
    lastObjectUrl.current = url;
    setSrc(url);

    e.currentTarget.value = '';
  };

  useEffect(() => {
    return () => {
      if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
    };
  }, []);

  return { src, setSrc, fileInputRef, openFileDialog, onFileChange };
}
