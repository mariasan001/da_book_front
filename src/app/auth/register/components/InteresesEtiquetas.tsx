import { useState, useEffect } from 'react';
import './styles/etiquetas.css';
import { useDisciplinas } from '@/app/hooks/useDisciplinas';
import { useRegister } from '../context/RegisterContext';

const colores = [
  ['#FF00C8', '#FF85D8'],
  ['#00FFD1', '#88FFF0'],
  ['#FFD700', '#FFF380'],
  ['#00FF0A', '#A5FFB4'],
  ['#FF5E00', '#FFAD66'],
  ['#008CFF', '#5EC8FF'],
  ['#FF0099', '#FF66C4'],
  ['#9400D3', '#D891FF'],
];
export default function InteresesEtiquetas() {
  const { disciplinas, loading } = useDisciplinas();
  const { setDisciplinas } = useRegister();
  const [activos, setActivos] = useState<number[]>([]);

  const handleClick = (id: number) => {
    setActivos((prev) => {
      const yaActivo = prev.includes(id);
      if (yaActivo) return prev.filter(i => i !== id);
      if (prev.length < 4) return [...prev, id];
      return prev;
    });
  };

  // Sincroniza el estado global cuando cambia `activos`
  useEffect(() => {
    setDisciplinas(activos);
  }, [activos]);

  if (loading) return <p className="etiquetas-loading">Cargando disciplinas...</p>;

  return (
    <div className="etiquetas-wrapper">
      <div className="etiquetas-contenedor-auto">
        {[...disciplinas, ...disciplinas].map((disciplina, index) => {
          const [color1, color2] = colores[index % colores.length];
          const activo = activos.includes(disciplina.id);

          return (
            <span
              key={index}
              className={`etiqueta ${activo ? 'activa' : ''}`}
              style={{ '--color1': color1, '--color2': color2 } as React.CSSProperties}
              onClick={() => handleClick(disciplina.id)}
            >
              {disciplina.descDisciplina}
            </span>
          );
        })}
      </div>
    </div>
  );
}
