// === hooks/useMenuItems.ts ===
import { useMemo } from 'react';
import { allMenuItems } from '../constants/menuItems';
import { getUserPlan, getUserRol } from '../utils/authUtils';

export function useMenuItems() {
  const rol = getUserRol();
  const plan = getUserPlan();

  const menu = useMemo(() => {
    return allMenuItems.filter(item => {
      if (!item.roles.includes(rol)) return false;
      if (item.limitPlan && plan < item.limitPlan) return false;
      return true;
    });
  }, [rol, plan]);

  return menu;
}