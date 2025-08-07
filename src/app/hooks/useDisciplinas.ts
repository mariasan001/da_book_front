import { useEffect, useState } from 'react';
import { Disciplina } from '@/types/disciplina';
import { getDisciplinas } from '../services/registerService';

export function useDisciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDisciplinas()
      .then((res) => setDisciplinas(res.data))
      .catch(() => setDisciplinas([]))
      .finally(() => setLoading(false));
  }, []);

  return { disciplinas, loading };
}
