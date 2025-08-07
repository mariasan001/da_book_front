// src/hooks/useRoles.ts
import { useEffect, useState } from 'react';
import { Role } from '@/types/role';
import { getAvailableRoles } from '../services/registerService';

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAvailableRoles()
      .then((res) => setRoles(res.data))
      .catch(() => setRoles([]))
      .finally(() => setLoading(false));
  }, []);

  return { roles, loading };
}
