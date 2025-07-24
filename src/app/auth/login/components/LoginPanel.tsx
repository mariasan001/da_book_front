'use client';

import LoginTabs from './LoginTabs';
import './styles/login-panel.css';
import UserPreview from './UserPreview';

interface Props {
  modoRegistro: boolean;
  onSeleccionarRegistro: () => void;
  onSeleccionarLogin: () => void;
}

export default function LoginPanel({ modoRegistro, onSeleccionarRegistro, onSeleccionarLogin }: Props) {
  return (
    <section className={`glass-wrapper ${modoRegistro ? 'registro' : 'inicio'}`}>
      <div className="blur-shape"></div>
      <div className="blur-shape alt"></div>

      <section className={`login-panel ${modoRegistro ? 'artist-mode' : ''}`}>
        <div className="login-panel__top">
          <LoginTabs
            modoRegistro={modoRegistro}
            onSeleccionarRegistro={onSeleccionarRegistro}
            onSeleccionarLogin={onSeleccionarLogin}
          />
        </div>

        {!modoRegistro && (
          <div className="login-panel__bottom">
            <UserPreview />
          </div>
        )}
      </section>
    </section>
  );
}
