'use client';

import { ReactNode } from 'react';

interface IconInputProps {
  iconLeft: ReactNode;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconRight?: ReactNode;
  onRightIconClick?: () => void;
}

export default function IconInput({
  iconLeft,
  placeholder,
  type = 'text',
  value,
  onChange,
  iconRight,
  onRightIconClick,
}: IconInputProps) {
  return (
    <div className="input-icon glass-effect">
      <span className="icon icon-left">{iconLeft}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="input-field"
        value={value}
        onChange={onChange}
      />
      {iconRight && (
        <span className="icon icon-right clickable" onClick={onRightIconClick}>
          {iconRight}
        </span>
      )}
    </div>
  );
}
