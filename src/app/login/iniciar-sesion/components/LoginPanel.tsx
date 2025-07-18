'use client';
import './styles/login-panel.css';

export default function LoginPanel() {
  return (
    <section className="glass-wrapper">
      <div className="blur-shape"></div>
      <div className="blur-shape alt"></div>

      <section className="login-panel">
        <div className="login-panel__top">
          <button className="tab">Registrarme</button>
          <button className="tab tab--active">Iniciar Sesión</button>
        </div>

        <div className="login-panel__bottom">
          <div className="user">
            <img className="user__avatar" src="/lucia.png" alt="Lucía Oca" />
            <div className="user__info">
              <p className="user__name">LUCÍA OCA</p>
              <p className="user__role">Ilustradora</p>
            </div>
          </div>
          <button className="btn btn--outline">Ingresar</button>
        </div>
      </section>
    </section>
  );
}
