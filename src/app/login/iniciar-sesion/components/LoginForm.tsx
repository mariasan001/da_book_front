'use client';
import './styles/login-form.css';

export default function LoginForm() {
  return (
    <section className="login-form">
      <img className="login-form__logo" src="/logo-da-book.svg" alt="DA Book logo" />

      <h1 className="login-form__title">El espacio donde tus ideas cobran vida</h1>
      <p className="login-form__subtitle">Bienvenido, ingresa tus datos para empezar a explorar 🚀</p>

      <form>
        <div className="form-group">
          <label>Nombre creativo</label>
          <div className="input-icon">
            <span className="icon">🖋️</span>
            <input type="text" placeholder="Nombre creativo" />
          </div>
        </div>

        <div className="form-group">
          <label>Clave Secreta</label>
          <div className="input-icon">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Clave secreta" />
            <span className="icon icon--right">👁️</span>
          </div>
          <a className="form-link">recuperar mi clave secreta</a>
        </div>

        <button className="btn btn--primary">Comencemos a explorar</button>
      </form>

      <p className="legal">Aviso de privacidad</p>

      <div className="dots">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    </section>
  );
}
