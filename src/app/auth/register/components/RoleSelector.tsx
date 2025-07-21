'use client';

import Image from 'next/image';
import './styles/register-form.css';

export default function RoleSelector() {
  return (
    <section className="register-form">
      <div className="register-form__header">
        <h1>Únete a nuestra comunidad creativa</h1>
        <p>Elige tu camino y transforma tus ideas 🚀</p>
      </div>

      <div className="register-form__cards">
        <div className="register-card">
          <div className="register-card__icon">
            <Image src="/img/icono-bombilla.png" alt="Aprender" width={60} height={60} />
          </div>
          <h3>Quiero Aprender</h3>
          <p>
            Como alumno podrás explorar un mundo de arte y creatividad, aprender de artistas apasionados y descubrir nuevos horizontes creativos.
          </p>
        </div>

        <div className="register-card">
          <div className="register-card__icon">
            <Image src="/img/icono-clap.png" alt="Inspirar" width={60} height={60} />
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
