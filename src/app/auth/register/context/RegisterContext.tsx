// src/context/RegisterContext.tsx
import { createContext, useContext, useState } from 'react';

interface RegisterState {
  rolId: number | null;
  disciplinas: number[];
  setRolId: (id: number) => void;
  setDisciplinas: (ids: number[]) => void;
}

const RegisterContext = createContext<RegisterState | undefined>(undefined);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [rolId, setRolId] = useState<number | null>(null);
  const [disciplinas, setDisciplinas] = useState<number[]>([]);

  return (
    <RegisterContext.Provider value={{ rolId, setRolId, disciplinas, setDisciplinas }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);
  if (!context) throw new Error('useRegister debe usarse dentro de <RegisterProvider>');
  return context;
}

