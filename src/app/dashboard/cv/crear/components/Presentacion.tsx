'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import styles from './Presentacion.module.css';

type Modo = 'editar' | 'vista';

export default function PresentacionCard({
  modo: externalModo,
}: {
  modo?: Modo;
}) {
  // Si no recibimos modo como prop, controlamos internamente
  const [internalModo, setInternalModo] = useState<Modo>('editar');
  const modo = externalModo ?? internalModo;

  const [nombre, setNombre] = useState('Miguel "Miky" Rojas');
  const [usuario, setUsuario] = useState('@miky_rojas');
  const [bio, setBio] = useState(
    'Músico, compositor y productor independiente con más de 10 años de experiencia en enseñanza musical. Ha formado a +500 alumnos de todas las edades.'
  );
  const [imagen, setImagen] = useState('/ruta/temporal.jpg');
  const [pais, setPais] = useState('Ciudad, País');

  const [alumnos] = useState(5400);
  const [articulos] = useState(1);

  const bioRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resaltar texto seleccionado en bio
  const handleHighlight = () => {
    const textarea = bioRef.current;
    if (!textarea) return;
    const { selectionStart: start, selectionEnd: end } = textarea;
    if (start === end) return;

    const before = bio.slice(0, start);
    const selected = bio.slice(start, end);
    const after = bio.slice(end);
    setBio(`${before}[mark]${selected}[/mark]${after}`);
    requestAnimationFrame(() => textarea.focus());
  };

  // Renderizado de bio con marcas
  const parsedBio = useMemo(() => {
    const parts = bio.split(/(\[mark\]|\[\/mark\])/g);
    let isMarked = false;
    return parts
      .map((part, i) => {
        if (part === '[mark]') {
          isMarked = true;
          return null;
        }
        if (part === '[/mark]') {
          isMarked = false;
          return null;
        }
        if (!part) return null;
        return isMarked ? (
          <span key={i} className={styles.fucsia}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })
      .filter(Boolean);
  }, [bio]);

  // Manejo de imagen y limpieza de objectURL
  const lastObjectUrl = useRef<string | null>(null);
  const handleUploadClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);

    const url = URL.createObjectURL(file);
    lastObjectUrl.current = url;
    setImagen(url);

    e.currentTarget.value = '';
  };

  useEffect(() => {
    return () => {
      if (lastObjectUrl.current) URL.revokeObjectURL(lastObjectUrl.current);
    };
  }, []);

  const articulosLabel = useMemo(
    () =>
      `${articulos} ${
        articulos === 1 ? 'artículo' : 'artículos'
      } publicados`,
    [articulos]
  );

  return (
    <section
      className={modo === 'vista' ? styles.presentacion : styles['presentacion-editar']}
      aria-live="polite"
    >
      {modo === 'vista' ? (
        <div className={styles.contenido}>
          <div className={styles.texto}>
            <h1>{nombre}</h1>
            <p className={styles.usuario}>
              {usuario}{' '}
              <span className={styles.estrella} aria-label="calificación">
                ⭐4.7
              </span>
            </p>

            <p className={styles.bio}>{parsedBio}</p>

            <div className={styles.infoExtra}>
              <span>{pais}</span>
              <span className={styles.divisor} aria-hidden>
                │
              </span>
              <span>{alumnos.toLocaleString('es-MX')} Alumnos</span>
              <span className={styles.divisor} aria-hidden>
                │
              </span>
              <span>{articulosLabel}</span>
            </div>

            <div className={styles.botones}>
              <button type="button">Seguir Artista</button>
              <button type="button">Contactar</button>
            </div>
          </div>

          <div className={styles.foto}>
            <div className={styles.uploadWrapper}>
              <img
                src={imagen}
                alt={`Foto de ${nombre}`}
                className={styles.imagenPreview}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contenedorFlex}>
          <div className={styles.editorGrid}>
            <div className={styles.editorInputs}>
              <label className={styles.label}>
                <span>Nombre artístico</span>
                <input
                  placeholder="¿Cómo quieres que el mundo te recuerde?"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </label>

              <label className={styles.label}>
                <span>Usuario</span>
                <input
                  placeholder="Tu @ o nombre de usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                />
              </label>

              <div className={styles.bioTextareaWrapper}>
                <label className={styles.label} htmlFor="bio">
                  <span>Bio</span>
                </label>
                <textarea
                  id="bio"
                  ref={bioRef}
                  placeholder="Tu descripción o bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                />
                <button
                  className={styles.highlightBtn}
                  type="button"
                  onClick={handleHighlight}
                  title="Resaltar selección en la bio"
                >
                  Subrayar
                </button>
              </div>

              <label className={styles.label}>
                <span>🌍 País de residencia</span>
                <input
                  className={styles.inputPais}
                  placeholder="País de residencia"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className={styles.editorFoto}>
            <div className={styles.uploadWrapper}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
                aria-hidden
              />
              <img
                src={imagen}
                alt="Vista previa"
                className={styles.imagenPreview}
              />
              <button
                className={styles.uploadBtn}
                onClick={handleUploadClick}
                title="Cambiar imagen"
                aria-label="Cambiar imagen"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
