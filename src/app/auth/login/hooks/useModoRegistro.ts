'use client';

import { useEffect, useState } from 'react';

// Tipos permitidos para las pantallas
type Pantalla =
  | 'login'
  | 'selector'
  | 'registroAlumno'
  | 'registroArtista';

export function usePantallaRegistro() {
  const [pantalla, setPantalla] = useState<Pantalla>('login');
  const [apareciendo, setApareciendo] = useState(false);

  // Cambiar de pantalla y controlar efecto visual de aparición
  const cambiarPantalla = (nuevaPantalla: Pantalla) => {
    setPantalla(nuevaPantalla);
    setApareciendo(false);
    setTimeout(() => setApareciendo(true), 300);
  };

  // Métodos específicos para cada pantalla
  const irALogin = () => cambiarPantalla('login');
  const irASelector = () => cambiarPantalla('selector');
  const irARegistroAlumno = () => cambiarPantalla('registroAlumno');
  const irARegistroArtista = () => cambiarPantalla('registroArtista');

  // Activar la primera vez al montar
  useEffect(() => {
    const timeout = setTimeout(() => setApareciendo(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return {
    pantalla,
    apareciendo,
    irALogin,
    irASelector,
    irARegistroAlumno,
    irARegistroArtista
  };
}
