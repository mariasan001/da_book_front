'use client';

import './Sidebar.css';
import SidebarItem from './SidebarItem';
import { LayoutDashboard, User, Star, Settings, Bell } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
      <Image 
        src="/img/logo-blanco.png" 
        alt="Logo" 
        width={16} 
        height={16} 
        className="logo-img" 
        priority
      />
    </div>

      <nav className="sidebar-menu">
        <SidebarItem icon={<LayoutDashboard size={22} />} label="Dashboard" path="/dashboard" />
        <SidebarItem icon={<User size={22} />} label="Perfil" path="/perfil" />
        <SidebarItem icon={<Star size={22} />} label="Favoritos" path="/favoritos" />
        <SidebarItem icon={<Bell size={22} />} label="Notificaciones" path="/notificaciones" />
        <SidebarItem icon={<Settings size={22} />} label="Configuración" path="/configuracion" />
      </nav>

      <div className="sidebar-footer">
         <Image 
          src="/img/logo-blanco.png" 
          alt="Logo" 
          width={16} 
          height={16} 
          className="logo-img" 
          priority
        />
      </div>
    </aside>
  );
}
