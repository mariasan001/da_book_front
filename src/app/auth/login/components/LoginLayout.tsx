'use client';

import { useState } from 'react';
import RoleSelector from '../../register/components/RoleSelector';
import RegistroFormulario from '../../register/components/RegistroFormulario';
import LoginForm from './LoginForm';
import LoginPanel from './LoginPanel';
import './styles/login-layout.css';
import { usePantallaRegistro } from '../hooks/useModoRegistro';
import LogoEsquina from '@/components/logo/LogoEsquina';
import { RegisterProvider } from '../../register/context/RegisterContext'; // Asegúrate de importar esto

export default function LoginLayout() {
  const {
    pantalla,
    apareciendo,
    irASelector,
    irARegistroAlumno,
    irARegistroArtista,
    irALogin
  } = usePantallaRegistro();

  const esRegistro =
    pantalla === 'selector' ||
    pantalla === 'registroAlumno' ||
    pantalla === 'registroArtista';

  const [rolSeleccionado, setRolSeleccionado] = useState<number | null>(null);

  return (
    <main className={`login-layout ${esRegistro ? 'registro' : 'login'} ${(['login', 'selector'].includes(pantalla) && apareciendo) ? 'apareciendo' : ''} ${pantalla === 'registroArtista' ? 'modo-artista' : ''}`}>
      
      {/* Panel lateral izquierdo */}
      <div className="contenedor-panel">
        <LoginPanel
          modoRegistro={esRegistro}
          onSeleccionarRegistro={irASelector}
          onSeleccionarLogin={irALogin}
        />
      </div>

      {/* Formulario derecho dinámico */}
      <div className={`contenedor-form ${['registroAlumno', 'registroArtista'].includes(pantalla) ? 'mostrar-formulario' : ''}`}>
        <LogoEsquina rol={pantalla === 'registroArtista' ? 'artista' : 'alumno'} />

        {pantalla === 'login' && (
          <div className={`${apareciendo ? 'apareciendo' : ''}`}>
            <LoginForm modoRegistro={false} />
          </div>
        )}

        {pantalla === 'selector' && (
          <div className={`${apareciendo ? 'apareciendo' : ''}`}>
            <RoleSelector
              onSeleccionarAlumno={(rolId) => {
                setRolSeleccionado(rolId);
                irARegistroAlumno();
              }}
              onSeleccionarArtista={(rolId) => {
                setRolSeleccionado(rolId);
                irARegistroArtista();
              }}
            />
          </div>
        )}

        {/*Aquí envolvemos con RegisterProvider SOLO la parte que lo necesita */}
        {(pantalla === 'registroAlumno' || pantalla === 'registroArtista') && rolSeleccionado !== null && (
          <RegisterProvider>
            <div className="desplazar-formulario" key={pantalla}>
              <RegistroFormulario rolId={rolSeleccionado} />
            </div>
          </RegisterProvider>
        )}
      </div>
    </main>
  );
}
