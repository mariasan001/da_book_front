'use client';

import Image from 'next/image';
import './styles/login-form.css';

// Iconos modernos de Lucide
import { PenLine, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function LoginForm() {
    const [visible, setVisible] = useState(false);
  return (
    <section className="login-form">
      {/* Logo */}
      <div className="login-form__logo">
        <Image
          src="/img/logo-blanco.png"
          alt="DA Book logo"
          width={90}
          height={40}
          priority
        />
      </div>

      {/* Títulos */}
      <h1 className="login-form__title">El espacio donde tus ideas cobran vida</h1>
      <p className="login-form__subtitle">
        Bienvenido, ingresa tus datos para empezar a explorar 🚀
      </p>

      {/* Formulario */}
<form>
  {/* Nombre creativo */}
  <div className="form-group">
    <label className="form-label">Nombre creativo</label>
    <div className="input-icon glass-effect">
      <span className="icon icon-left">
        <PenLine size={18} />
      </span>
      <input
        type="text"
        placeholder="Nombre creativo"
        className="input-field"
      />
    </div>
  </div>

  {/* Clave secreta */}
   <div className="form-group">
      <label className="form-label">Clave Secreta</label>
      <div className="input-icon glass-effect">
        {/* Icono izquierdo */}
        <span className="icon icon-left">
          <Lock size={18} />
        </span>

        {/* Input con toggle de tipo */}
        <input
          type={visible ? "text" : "password"}
          placeholder="Clave secreta"
          className="input-field"
        />

        {/* Icono derecho toggle */}
        <span
          className="icon icon-right clickable"
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      {/* Link de recuperación */}
      <a className="form-link">recuperar mi clave secreta</a>
    </div>

  {/* Botón */}
 <div className="button-container">
  <button className="btnn btn--primary">Comencemos a explorar</button>
</div>

   </form>

    </section>
  );
}
