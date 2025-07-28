// === constants/menuItems.ts ===
import { Home, LayoutDashboard, BookUser, FileText } from 'lucide-react';

export const allMenuItems = [
  {
    label: 'Inicio',
    path: '/inicio',
    icon: Home,
    roles: ['admin', 'artista'],
  },
  {
    label: 'CV Dinámico',
    path: '/cv',
    icon: BookUser,
    roles: ['artista'],
    limitPlan: 1, // visible solo si tiene plan 1 o superior
  },
  {
    label: 'Administración',
    path: '/admin',
    icon: LayoutDashboard,
    roles: ['admin'],
  },
  {
    label: 'Documentos',
    path: '/docs',
    icon: FileText,
    roles: ['admin', 'artista'],
    limitPlan: 2,
  },
];
