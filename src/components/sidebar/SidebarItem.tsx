'use client';

import './SidebarItem.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export default function SidebarItem({ icon, label, path }: Props) {
  const pathname = usePathname();
  const active = pathname === path;

  return (
    <Link href={path} className={`sidebar-item ${active ? 'active' : ''}`}>
      <div className="icon">{icon}</div>
      <span className="tooltip">{label}</span>
    </Link>
  );
}
