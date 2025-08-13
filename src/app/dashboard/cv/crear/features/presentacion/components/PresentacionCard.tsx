'use client';

import { useMemo, useRef, useState } from 'react';
import styles from '../Presentacion.module.css';

import type { Modo, PresentacionData } from '../types';
import { formatNumberMX, articulosLabel } from '../utils/strings';
import { useBioMarks, highlightSelectionInBio } from '../hooks/useBioMarks';
import { useObjectUrlImage } from '../hooks/useObjectUrlImage';
import AvatarUploader from './AvatarUploader';
import EditableFields from './EditableFields';

export default function PresentacionCard({
  modo: externalModo,
  initial,
}: {
  modo?: Modo;
  initial?: Partial<PresentacionData>;
}) {
  // Modo (controlado o interno)
  const [internalModo] = useState<Modo>('editar');
  const modo = externalModo ?? internalModo;

  // Estado
  const [nombre, setNombre]   = useState(initial?.nombre  ?? 'Miguel "Miky" Rojas');
  const [usuario, setUsuario] = useState(initial?.usuario ?? '@miky_rojas');
  const [bio, setBio]         = useState(initial?.bio     ?? 'Músico, compositor y productor independiente con más de 10 años de experiencia en enseñanza musical. Ha formado a +500 alumnos de todas las edades.');
  const [pais, setPais]       = useState(initial?.pais    ?? 'Ciudad, País');

  const alumnos   = useMemo(() => initial?.alumnos   ?? 5400, []);
  const articulos = useMemo(() => initial?.articulos ?? 1,    []);

  // Subrayado
  const [hlMode, setHlMode] = useState(false);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const onHighlight = () => highlightSelectionInBio(bioRef.current, bio, setBio);

  const parsedBio = useBioMarks(bio, styles.fucsia);

  // Imagen
  const {
    src: imagen,
    fileInputRef, openFileDialog, onFileChange
  } = useObjectUrlImage(initial?.imagen ?? '/ruta/temporal.jpg');

  const articulosTxt = useMemo(() => articulosLabel(articulos), [articulos]);

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
              <span className={styles.estrella} aria-label="calificación">⭐4.7</span>
            </p>

            <p className={styles.bio}>{parsedBio}</p>

            <div className={styles.infoExtra}>
              <span>{pais}</span>
              <span className={styles.divisor} aria-hidden>│</span>
              <span>{formatNumberMX(alumnos)} Alumnos</span>
              <span className={styles.divisor} aria-hidden>│</span>
              <span>{articulosTxt}</span>
            </div>

            <div className={styles.botones}>
              <button type="button">Seguir Artista</button>
              <button type="button">Contactar</button>
            </div>
          </div>

          <div className={styles.foto}>
            <div className={styles.uploadWrapper}>
              <img src={imagen} alt={`Foto de ${nombre}`} className={styles.imagenPreview} />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.contenedorFlex}>
          <EditableFields
            nombre={nombre} setNombre={setNombre}
            usuario={usuario} setUsuario={setUsuario}
            bio={bio} setBio={setBio}
            pais={pais} setPais={setPais}
            bioRef={bioRef}
            onHighlight={onHighlight}
            highlightMode={hlMode}
            classNames={{
              grid: styles.editorGrid,
              label: styles.label,
              bioWrapper: styles.bioTextareaWrapper,
              highlightBtn: styles.highlightBtn,
              inputPais: styles.inputPais,
            }}
          />

          <div className={styles.editorFoto}>
            <AvatarUploader
              imgSrc={imagen}
              onOpenDialog={openFileDialog}
              fileInputRef={fileInputRef}
              onChange={onFileChange}
              alt="Vista previa"
              classNames={{
                wrapper: styles.uploadWrapper,
                preview: styles.imagenPreview,
                button: styles.uploadBtn,
              }}
            />
          </div>

          {/* FAB de subrayado */}
          <button
            type="button"
            className={`${styles.hlFab} ${hlMode ? styles.active : ''}`}
            aria-pressed={hlMode}
            title={hlMode ? 'Modo subrayado: activo' : 'Modo subrayado: desactivado'}
            onClick={() => setHlMode(v => !v)}
          >
            🖍️
          </button>
        </div>
      )}
    </section>
  );
}
