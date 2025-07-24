'use client';
import { useState } from 'react';
import './styles/etiquetas.css';

const intereses = [
  "Ilustración", "Cine", "Danza", "Arte Urbano", "Pintura", "Cerámica",
  "Teatro", "Música", "Fotografía", "Diseño", "Arquitectura", "Moda"
];

// Colores tipo neón
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
  const [activos, setActivos] = useState<string[]>([]);

  const handleClick = (interes: string) => {
    setActivos((prev) => {
      const yaActivo = prev.includes(interes);
      if (yaActivo) {
        return prev.filter(i => i !== interes);
      } else if (prev.length < 4) {
        return [...prev, interes];
      } else {
        return prev; // no agrega más de 4
      }
    });
  };

  // Duplicamos lista para animación infinita
  const etiquetasDuplicadas = [...intereses, ...intereses];

  return (
    <div className="etiquetas-wrapper">
      <div className="etiquetas-contenedor-auto">
        {etiquetasDuplicadas.map((interes, index) => {
          const [color1, color2] = colores[index % colores.length];
          const activo = activos.includes(interes);

          return (
            <span
              key={index}
              className={`etiqueta ${activo ? 'activa' : ''}`}
              style={{ '--color1': color1, '--color2': color2 } as React.CSSProperties}
              onClick={() => handleClick(interes)}
            >
              {interes}
            </span>
          );
        })}
      </div>
    </div>
  );
}
