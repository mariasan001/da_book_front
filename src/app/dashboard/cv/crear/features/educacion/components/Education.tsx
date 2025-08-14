'use client';

import { useState } from 'react';
import styles from '../Educacion.module.css';
import type { Modo, EducacionData } from '../types';
import StoryBlock from './StoryBlock';
import InfluencesBlock from './InfluencesBlock';
import AcademicBlock from './AcademicBlock';

const DEFAULT_DATA: EducacionData = {
  historia: `Empecé a tocar guitarra a los 12, grabé mi primera demo en el cuarto de mi abuela, y desde entonces no he dejado de explorar.
Mi música ha sido mi diario, mi protesta, mi consuelo.
Hoy, cada canción que creo tiene una misión: acompañarte.`,
  influencias: ['Natalia Lafourcade', 'Jorge Drexler', 'Hiatus Kaiyote', 'folklore mexicano'],
  academico: [
    { id: 'a1', texto: 'Lic. en Música y Producción – Universidad del Arte Sonoro' },
    { id: 'a2', texto: 'Diplomado en Composición para Cine y Medios Visuales – Centro de Creadores (2022)' },
  ],
};

export default function Education({
  modo = 'editar',
  initial = DEFAULT_DATA,
}: {
  modo?: Modo;
  initial?: EducacionData;
}) {
  const [historia, setHistoria] = useState(initial.historia);
  const [influencias, setInfluencias] = useState<string[]>(initial.influencias);
  const [academico, setAcademico] = useState(initial.academico);

  return (
    <section className={styles.wrap} aria-label="Educación e historia">
      <h2 className={styles.title}>CUÉNTAME TU HISTORIA</h2>

      <StoryBlock modo={modo} value={historia} onChange={setHistoria} />
      <InfluencesBlock modo={modo} values={influencias} onChange={setInfluencias} />
      <AcademicBlock modo={modo} items={academico} onChange={setAcademico} />
    </section>
  );
}
