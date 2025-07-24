'use client';

import Image from 'next/image';

export default function UserPreview() {
  return (
    <div className="user-row">
      <div className="user">
        <Image
          className="user__avatar"
          src="/img/fondo de pantalla.jpg"
          alt="Lucía Oca"
          width={120}
          height={50}
          priority
        />
        <div className="user__info">
          <p className="user__name">LUCÍA OCA</p>
          <p className="user__role">Ilustradora</p>
        </div>
      </div>

      <button className="btn btn--outline">Ingresar</button>
    </div>
  );
}
