'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import './cv-dinamico-invitacion.css';

export default function CvDinamicoInvitacion() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animation/cv_dinamic.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Error cargando animación', err));
  }, []);

  return (
    <section className="cv-invitacion">
      <div className="cv-card">
        <div className="cv-animation">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ height: 200 }}
            />
          )}
        </div>

        <h1>¡Crea tu CV Dinámico!</h1>
        <p>
          Esta será tu carta de presentación como artista. Antes de explorar la plataforma,
          completa tu CV para que podamos ayudarte a conectar con más oportunidades.
        </p>
      </div>
    </section>
  );
}
