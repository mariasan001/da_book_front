'use client';

import { useState } from 'react';
import InteresesEtiquetas from './InteresesEtiquetas';
import './styles/registro-formulario.css';
import { textosFormulario } from '../constants/textosFormulario';
import { User, Mail, Lock, BadgePlus, BadgeMinus } from 'lucide-react';
import { useRegister } from '../context/RegisterContext';
import { registerUser } from '@/app/services/registerService';

interface Props {
  rolId: number;
}

// Componente principal del formulario de registro
export default function RegistroFormulario({ rolId }: Props) {
  const rolEsArtista = rolId === 2; // ⚠️ Asegúrate de que el ID '2' sea el correcto para "artista"
  const rol: 'alumno' | 'artista' = rolEsArtista ? 'artista' : 'alumno';
  const textos = textosFormulario[rol];
  const modoClaro = rolEsArtista;

  // Disciplinas seleccionadas (desde el contexto global)
  const { disciplinas } = useRegister();

  // Estados locales para cada input del formulario
  const [nombreCreativo, setNombreCreativo] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [apellido1, setApellido1] = useState('');
  const [apellido2, setApellido2] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      userId: nombreCreativo,
      nombre: nombreCompleto,
      upaterno: apellido1,
      uamaterno: apellido2,
      correo,
      password,
      rolId,
      disciplinas,
    };

    console.log('📦 Enviando payload al backend:', payload);

    try {
      await registerUser(payload);
      alert('✅ Registro exitoso');
    } catch (err) {
      alert('❌ Error al registrar');
    }
  };

  return (
    <form
      className={`registro-formulario ${modoClaro ? 'claro' : 'oscuro'}`}
      onSubmit={handleSubmit}
    >
      <h2 className="registro-titulo">{textos.titulo}</h2>
      <p className="subtitulo">{textos.subtitulo}</p>

      {/* Fila 1: nombre creativo y completo */}
      <div className="input-row">
        <InputGlass
          label="Nombre creativo"
          icon={<BadgePlus size={20} />}
          value={nombreCreativo}
          onChange={setNombreCreativo}
        />
        <InputGlass
          label="Nombre completo"
          icon={<User size={20} />}
          value={nombreCompleto}
          onChange={setNombreCompleto}
        />
      </div>

      {/* Fila 2: apellidos */}
      <div className="input-row">
        <InputGlass
          label="Primer Apellido"
          icon={<BadgeMinus size={20} />}
          value={apellido1}
          onChange={setApellido1}
        />
        <InputGlass
          label="Segundo Apellido"
          icon={<BadgeMinus size={20} />}
          value={apellido2}
          onChange={setApellido2}
        />
      </div>

      {/* Fila 3: correo y contraseña */}
      <div className="input-row">
        <InputGlass
          label="Correo electrónico"
          icon={<Mail size={20} />}
          tipo="email"
          value={correo}
          onChange={setCorreo}
        />
        <InputGlass
          label="Contraseña"
          icon={<Lock size={20} />}
          tipo="password"
          value={password}
          onChange={setPassword}
        />
      </div>

      {/* Etiquetas de intereses que cargan las disciplinas */}
      <label className="intereses-label">{textos.pregunta}</label>
      <InteresesEtiquetas />

      {/* Botón para enviar */}
      <button type="submit" className="boton-submit">
        {textos.boton}
      </button>
    </form>
  );
}

// Componente reutilizable para inputs con íconos
function InputGlass({
  label,
  icon,
  tipo = 'text',
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  tipo?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <label className="input-group">
      <span className="input-label">{label}</span>
      <div className="input-wrapper">
        <div className="icon-box">{icon}</div>
        <input
          type={tipo}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder=""
        />
      </div>
    </label>
  );
}
