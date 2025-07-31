'use client';

import './styles/login-form.css';
import { PenLine, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import IconInput from '../components/IconInput';
import FormHeader from '../components/FormHeader';
import { useAuthContext } from '@/context/AuthContext';

interface Props {
  modoRegistro: boolean;
}

export default function LoginForm({ modoRegistro }: Props) {
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuthContext();

  const manejarInicio = async () => {
    setLoading(true);
    try {
      await login(username, password);
      router.push('/dashboard');       
    } catch (err) {
      alert('Usuario o contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`login-form transition-form ${modoRegistro ? 'registro' : 'login'}`}>
      {/* Encabezado */}
      <FormHeader
        title="El espacio donde tus ideas cobran vida"
        subtitle="Bienvenido, ingresa tus datos para empezar a explorar 🚀"
      />

      {/* Formulario */}
      <form>
        {/* Nombre creativo */}
        <div className="form-group">
          <label className="form-label">Nombre creativo</label>
          <IconInput
            iconLeft={<PenLine size={18} />}
            placeholder="Nombre creativo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Clave secreta */}
        <div className="form-group">
          <label className="form-label">Clave Secreta</label>
          <IconInput
            iconLeft={<Lock size={18} />}
            placeholder="Clave secreta"
            type={visible ? 'text' : 'password'}
            iconRight={visible ? <EyeOff size={18} /> : <Eye size={18} />}
            onRightIconClick={() => setVisible(!visible)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="form-link">Recuperar mi clave secreta</a>
        </div>

        {/* Botón */}
        <div className="button-container">
          <button
            type="button"
            className="btnn btn--primary"
            onClick={manejarInicio}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Comencemos a explorar'}
          </button>
        </div>
      </form>
    </section>
  );
}
