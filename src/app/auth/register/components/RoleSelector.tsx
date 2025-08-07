'use client';

import Image from 'next/image';
import './styles/role_selector.css';

import { Role } from '@/types/role'; // ✅ Modelo de rol
import { useRoles } from '@/app/hooks/useRoles';

interface Props {
  onSeleccionarAlumno: (rolId: number) => void;
  onSeleccionarArtista: (rolId: number) => void;
}

export default function RoleSelector({ onSeleccionarAlumno, onSeleccionarArtista }: Props) {
  const { roles, loading } = useRoles();

  if (loading) return <p>Cargando roles...</p>;

  // ✅ Tipado correcto de búsqueda
  const rolAlumno: Role | undefined = roles.find((rol) => rol.descRol === 'ROLE_STUDENT');
  const rolArtista: Role | undefined = roles.find((rol) => rol.descRol === 'ROLE_TEACHER');

  return (
    <section className="register-form">
      <div className="register-form__header">
        <h1>Únete a nuestra comunidad creativa</h1>
        <p>Elige tu camino y transforma tus ideas 🚀</p>
      </div>

      <div className="register-form__cards">
        {/* Card para alumno */}
        <div
          className="register-card"
          onClick={() => rolAlumno && onSeleccionarAlumno(rolAlumno.id)}
        >
          <div className="register-card__icon">
            <Image src="/img/cohete.png" alt="Aprender" width={60} height={60} />
          </div>
          <h3>Quiero Aprender</h3>
          <p>
            Como alumno podrás explorar un mundo de arte y creatividad, aprender de artistas apasionados y descubrir nuevos horizontes creativos.
          </p>
        </div>

        {/* Card para artista */}
        <div
          className="register-card"
          onClick={() => rolArtista && onSeleccionarArtista(rolArtista.id)}
        >
          <div className="register-card__icon">
            <Image src="/img/microfono.png" alt="Inspirar" width={60} height={60} />
          </div>
          <h3>Quiero Inspirar</h3>
          <p>
            Como artista podrás inspirar con tus creaciones, compartir tus conocimientos y crear un espacio único para tu arte.
          </p>
        </div>
      </div>
    </section>
  );
}
