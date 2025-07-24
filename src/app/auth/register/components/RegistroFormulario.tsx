import InteresesEtiquetas from './InteresesEtiquetas';
import './styles/registro-formulario.css';
import { textosFormulario } from '../constants/textosFormulario';
import { User, Mail, Lock, BadgePlus, BadgeMinus } from 'lucide-react';

interface Props {
  rol: 'alumno' | 'artista';
}

export default function RegistroFormulario({ rol }: Props) {
  const textos = textosFormulario[rol];
  const modoClaro = rol === 'artista';

  return (
    <form className={`registro-formulario ${modoClaro ? 'claro' : 'oscuro'}`}>
     <h2 className="registro-titulo">{textos.titulo}</h2>

      <p className="subtitulo">{textos.subtitulo}</p>

      {/* Fila 1 */}
      <div className="input-row">
        <InputGlass label="Nombre creativo" icon={<BadgePlus size={20} />} />
        <InputGlass label="Nombre completo" icon={<User size={20} />} />
      </div>

      {/* Fila 2 */}
      <div className="input-row">
        <InputGlass label="Primer Apellido" icon={<BadgeMinus size={20} />} />
        <InputGlass label="Segundo Apellido" icon={<BadgeMinus size={20} />} />
      </div>

      {/* Fila 3 */}
      <div className="input-row">
        <InputGlass label="Correo electrónico" icon={<Mail size={20} />} tipo="email" />
        <InputGlass label="Contraseña" icon={<Lock size={20} />} tipo="password" />
      </div>

      <label className="intereses-label">{textos.pregunta}</label>
      <InteresesEtiquetas />

      <button type="submit" className="boton-submit">
        {textos.boton}
      </button>
    </form>
  );
}

function InputGlass({
  label,
  icon,
  tipo = "text",
}: {
  label: string;
  icon: React.ReactNode;
  tipo?: string;
}) {
  return (
    <label className="input-group">
      <span className="input-label">{label}</span>
      <div className="input-wrapper">
        <div className="icon-box">{icon}</div>
        <input type={tipo} placeholder="" />
      </div>
    </label>
  );
}
