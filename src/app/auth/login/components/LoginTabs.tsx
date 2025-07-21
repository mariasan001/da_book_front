'use client';

interface Props {
  modoRegistro: boolean;
  onSeleccionarRegistro: () => void;
  onSeleccionarLogin: () => void;
}

export default function LoginTabs({ modoRegistro, onSeleccionarRegistro, onSeleccionarLogin }: Props) {
  return (
    <div className="login-tabs">
      <button 
        className={`tab ${modoRegistro ? 'tab--active' : ''}`} 
        onClick={onSeleccionarRegistro}
      >
        Registrarme
      </button>
      <button 
        className={`tab ${!modoRegistro ? 'tab--active' : ''}`} 
        onClick={onSeleccionarLogin}
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
