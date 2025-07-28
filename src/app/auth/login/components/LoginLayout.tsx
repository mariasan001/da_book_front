'use client';

import RoleSelector from '../../register/components/RoleSelector';
import RegistroFormulario from '../../register/components/RegistroFormulario';
import LoginForm from './LoginForm';
import LoginPanel from './LoginPanel';
import './styles/login-layout.css';
import { usePantallaRegistro } from '../hooks/useModoRegistro';
import LogoEsquina from '@/components/logo/LogoEsquina';

export default function LoginLayout() {
  // Hook personalizado que controla qué pantalla mostrar (login, selector o registro)
  const {
    pantalla,
    apareciendo,
    irASelector,
    irARegistroAlumno,
    irARegistroArtista,
    irALogin
  } = usePantallaRegistro();

  // Determina si estamos en alguna etapa del registro (para aplicar estilo visual de layout)
  const esRegistro =
    pantalla === 'selector' ||
    pantalla === 'registroAlumno' ||
    pantalla === 'registroArtista';

  return (
    // Clases dinámicas:
    // - 'registro' o 'login' controlan el movimiento de paneles
    // - 'apareciendo' activa animaciones (solo en login y selector, no en formularios)
  <main className={`login-layout ${esRegistro ? 'registro' : 'login'} ${(['login', 'selector'].includes(pantalla) && apareciendo) ? 'apareciendo' : ''} ${pantalla === 'registroArtista' ? 'modo-artista' : ''}`}>

      {/* Panel lateral izquierdo, no cambia en el flujo de registro */}
      <div className="contenedor-panel">
        <LoginPanel
          modoRegistro={esRegistro}
          onSeleccionarRegistro={irASelector}
          onSeleccionarLogin={irALogin}
        />
      </div>

      {/* Contenedor del formulario derecho (formulario dinámico) */}
      {/* Se le agrega 'mostrar-formulario' solo cuando se muestra el formulario final */}
      <div className={`contenedor-form ${['registroAlumno', 'registroArtista'].includes(pantalla) ? 'mostrar-formulario' : ''}`}>
      <LogoEsquina rol={pantalla === 'registroArtista' ? 'artista' : 'alumno'} />

        {/* Pantalla de login con animación de entrada controlada */}
        {pantalla === 'login' && (
          <div className={`${apareciendo ? 'apareciendo' : ''}`}>
            <LoginForm modoRegistro={false} />
          </div>
        )}

        {/* Selector de roles (alumno/artista) con animación de entrada */}
        {pantalla === 'selector' && (
          <div className={`${apareciendo ? 'apareciendo' : ''}`}>
            <RoleSelector
              onSeleccionarAlumno={irARegistroAlumno}
              onSeleccionarArtista={irARegistroArtista}
            />
          </div>
        )}

        {/* Formulario de registro (alumno o artista) */}
        {/* Tiene su propia animación diferente, definida por clase 'desplazar-formulario' */}
        {/* La prop 'key' asegura que React remonte el componente para reiniciar animación */}
        {(pantalla === 'registroAlumno' || pantalla === 'registroArtista') && (
          <div className="desplazar-formulario" key={pantalla}>
            <RegistroFormulario rol={pantalla === 'registroAlumno' ? 'alumno' : 'artista'} />
          </div>
        )}
      </div>
    </main>
  );
}
