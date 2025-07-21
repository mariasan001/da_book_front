'use client';

import './styles/login-panel.css';
import Image from 'next/image'; // Asegúrate de tener esta línea arriba

// Componente principal del panel de login y registro
export default function LoginPanel() {
  return (
    <section className="glass-wrapper">
      {/* Formas borrosas decorativas de fondo */}
      <div className="blur-shape"></div>
      <div className="blur-shape alt"></div>

      <section className="login-panel">
        {/* Pestañas de Registro e Inicio de Sesión */}
        <div className="login-panel__top">
          <div className="login-tabs">
            <button className="tab">Registrarme</button>
            <button className="tab tab--active">Iniciar Sesión</button>
          </div>
        </div>

        {/* Sección inferior con información del usuario y botón */}
        <div className="login-panel__bottom">
          <div className="user-row">
            <div className="user">
            <Image
              className="user__avatar"
              src="/img/fondo de pantalla.jpg"
              alt="Lucía Oca"
              width={48} // puedes ajustar esto
              height={48}
              priority // para que no sea lazy-load
             />
              <div className="user__info">
                <p className="user__name">LUCÍA OCA</p>
                <p className="user__role">Ilustradora</p>
              </div>
            </div>

            {/* Botón para ingresar */}
            <button className="btn btn--outline">Ingresar</button>
          </div>
        </div>
      </section>
    </section>
  );
}
