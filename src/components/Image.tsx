import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFilename } from '../services/helper';

interface Props {
  url: string;
  description?: string;
  clickUrl?: string;
}

export const Image = ({ url, description, clickUrl }: Props) => {
  const filename = getFilename(url);

  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (clickUrl) navigate(clickUrl);
    else setSearchParams({ file: filename });
  };

  const [src, setSrc] = useState(url);
  const [errors, setErrors] = useState(0);

  const handleImageError = (): void => {
    console.log('Image loading error! Reloading...');

    if (errors >= 4) return;

    setErrors(errors + 1);
    setSrc('');
    setTimeout(() => setSrc(url), 1000);
  };

  return (
    <img
      src={src}
      alt={description}
      onClick={handleImageClick}
      onError={handleImageError}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    />
  );
};
