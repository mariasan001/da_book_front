'use client';

import { ReactNode } from 'react';

import './dashboard.css'; // solo estilos de estructura general
import Topbar from './components/Topbar';
import LayoutContainer from './components/LayoutContainer';
import Sidebar from '@/components/sidebar/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar />
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </div>
    </div>
  );
}
