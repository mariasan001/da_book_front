'use client';

import { useState } from 'react';
import styles from './Presentacion.module.css';
import GlassWrapper from '@/components/GlassBackground';

interface PresentacionProps {
  modo?: 'editar' | 'vista'; 
}

export default function Presentacion({ modo = 'editar' }: PresentacionProps) {
  const [nombre, setNombre] = useState('Miguel "Miky" Rojas');
  const [usuario, setUsuario] = useState('@miky_rojas');
  const [bio, setBio] = useState('Músico, compositor y productor independiente con más de 10 años de experiencia...');
  const [frase, setFrase] = useState('Su método combina técnica, diversión y pasión real por la música.');
  const [imagen, setImagen] = useState('/ruta/temporal.jpg');

  return (
    <section className={modo === 'vista' ? styles.presentacion : styles['presentacion-editar']}>
      {/* Fondo de resplandor rosa */}
    <GlassWrapper>

      {modo === 'vista' ? (
        <div className={styles.contenido}>
          <div className={styles.texto}>
            <h1>{nombre}</h1>
            <p>{usuario} ⭐ 4.7</p>
            <p>{bio}</p>
            <p style={{ color: '#f08' }}>{frase}</p>
            <div className={styles.botones}>
              <button>Seguir Artista</button>
              <button>Contactar</button>
            </div>
          </div>
          <div className={styles.foto}>
            <img src={imagen} alt="Artista" />
          </div>
        </div>
      ) : (
        <div className={styles.form}>
          <input
            placeholder="¿Cómo quieres que el mundo te recuerde?"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            placeholder="Tu @ o nombre de usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <textarea
            placeholder="Tu descripción o bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <textarea
            placeholder="En una frase... ¿quién eres?"
            value={frase}
            onChange={(e) => setFrase(e.target.value)}
          />
          <button onClick={() => alert('Simular carga de imagen')}>Cargar Imagen</button>
        </div>
      )}
        </GlassWrapper>
    </section>
     
  );
}
