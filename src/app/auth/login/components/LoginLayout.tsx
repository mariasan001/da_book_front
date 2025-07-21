'use client';


import RegisterForm from '../../register/components/RoleSelector';
import { useModoRegistro } from '../hooks/useModoRegistro';
import LoginForm from './LoginForm';
import LoginPanel from './LoginPanel';
import './styles/login-layout.css';

export default function LoginLayout() {
  const { modoRegistro, apareciendo, activarRegistro, activarLogin } = useModoRegistro();

  return (
    <main className={`login-layout ${modoRegistro ? 'registro' : 'login'} ${apareciendo ? 'apareciendo' : ''}`}>
      <div className="contenedor-panel">
        <LoginPanel 
          modoRegistro={modoRegistro} 
          onSeleccionarRegistro={activarRegistro}
          onSeleccionarLogin={activarLogin}
        />
      </div>
    <div className="contenedor-form">
      {apareciendo && (
        modoRegistro ? (
          <RegisterForm />
        ) : (
          <LoginForm modoRegistro={modoRegistro} />
        )
      )}
    </div>
    </main>
  );
}
