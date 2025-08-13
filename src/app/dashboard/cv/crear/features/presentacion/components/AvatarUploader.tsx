'use client';

import React from 'react';

interface Props {
  imgSrc: string;
  onOpenDialog: () => void;
  fileInputRef: React.Ref<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  classNames: {
    wrapper: string;
    preview: string;
    button: string;
  };
  alt: string;
}

export default function AvatarUploader({
  imgSrc, onOpenDialog, fileInputRef, onChange, classNames, alt
}: Props) {
  return (
    <div className={classNames.wrapper}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onChange}
        aria-hidden
      />
      <img src={imgSrc} alt={alt} className={classNames.preview} />
      <button
        className={classNames.button}
        onClick={onOpenDialog}
        title="Cambiar imagen"
        aria-label="Cambiar imagen"
        type="button"
      >
        +
      </button>
    </div>
  );
}
