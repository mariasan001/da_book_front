'use client';

import { X, Smile, Heart, Star, Camera, Globe, Bell, Shield } from 'lucide-react';
import './IconModal.css'; // Estilo opcional, te lo paso abajo
import { useEditor } from '../../../../context/EditorContext';

interface IconModalProps {
  onClose: () => void;
}

const icons = [
  { name: 'Smile', Icon: Smile },
  { name: 'Heart', Icon: Heart },
  { name: 'Star', Icon: Star },
  { name: 'Camera', Icon: Camera },
  { name: 'Globe', Icon: Globe },
  { name: 'Bell', Icon: Bell },
  { name: 'Shield', Icon: Shield },
];

export default function IconModal({ onClose }: IconModalProps) {
  const { addElement } = useEditor();

  const handleSelectIcon = (name: string) => {
    addElement('icono', { iconName: name }); // Puedes extender addElement para aceptar props
    onClose();
  };

  return (
    <div className="icon-modal-overlay" onClick={onClose}>
      <div className="icon-modal" onClick={(e) => e.stopPropagation()}>
        <div className="icon-modal-header">
          <h3>Selecciona un ícono</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="icon-grid-modal">
          {icons.map(({ name, Icon }) => (
            <button
              key={name}
              title={name}
              className="icon-button"
              onClick={() => handleSelectIcon(name)}
            >
              <Icon size={32} />
              <span>{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
