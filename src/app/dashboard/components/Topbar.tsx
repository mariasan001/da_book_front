'use client';
import './styles/Topbar.css';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Topbar() {
  const [fechaActual, setFechaActual] = useState('');

  useEffect(() => {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    const fechaFormateada = fecha
      .toLocaleDateString('es-MX', opciones)
      .toUpperCase();
    setFechaActual(fechaFormateada);
  }, []);

  const nombreUsuario = 'ART'; // Esto después será dinámico

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>
          BIENVENIDO,<span className="nombre">{nombreUsuario}</span>
        </h1>
        <p className="fecha">{fechaActual}</p>
      </div>

      <div className="topbar-right">
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="btn-salir">Salir</button>
      </div>
    </header>
  );
}
