'use client';
import { useEffect, useState } from 'react';

export function useModoRegistro() {
  const [modoRegistro, setModoRegistro] = useState(false); // Login por defecto
  const [apareciendo, setApareciendo] = useState(false);

  const activarRegistro = () => {
    setModoRegistro(true);
    setApareciendo(false);
    setTimeout(() => setApareciendo(true), 300);
  };

  const activarLogin = () => {
    setModoRegistro(false);
    setApareciendo(false);
    setTimeout(() => setApareciendo(true), 300);
  };

  // 👇 Aquí es la clave: activar apareciendo en el primer render
  useEffect(() => {
    const timeout = setTimeout(() => setApareciendo(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return {
    modoRegistro,
    apareciendo,
    activarRegistro,
    activarLogin
  };
}
