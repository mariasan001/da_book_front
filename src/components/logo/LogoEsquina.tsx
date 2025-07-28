'use client';

import Image from 'next/image';
import './styles/logo-esquina.css';

interface Props {
  rol: 'alumno' | 'artista';
}

export default function LogoEsquina({ rol }: Props) {
  const logoSrc = rol === 'artista' ? '/img/logo.png' : '/img/logo-blanco.png';

  return (
    <div className="logo-esquina">
      <Image src={logoSrc} alt="Logo" width={90} height={40} />
    </div>
  );
}
