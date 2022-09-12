import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { getFilename, isImageUrl, getThumbnail } from '../services/helper';

import { FileInterface } from '../types';

interface Props {
  file: FileInterface;
  clickUrl?: string;
  isSkipFileText?: boolean; // used for the home page
  isFirstSectionFile?: boolean;
}

export const File = ({
  file,
  clickUrl,
  isSkipFileText,
  isFirstSectionFile,
}: Props) => {
  const { url, thumbnail, description, text } = file;
  const filename = getFilename(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (clickUrl) return;

    setSearchParams({ file: filename });
  };

  const [src, setSrc] = useState(getThumbnail(url, thumbnail));
  const [errors, setErrors] = useState(0);

  const handleImageError = (): void => {
    console.log('Image loading error! Reloading...');
    if (errors >= 4) {
      return;
    }
    setErrors(errors + 1);
    setSrc('');
    setTimeout(() => setSrc(getThumbnail(url, thumbnail)), 1000);
  };

  const getImageComponent = () => (
    <img
      src={src}
      alt={file.description}
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

  return (
    <>
      {!isFirstSectionFile && !isSkipFileText && <Markdown text={text} />}

      <LazyLoad>
        <div style={{ textAlign: 'center' }}>
          {isImageUrl(url) &&
            (clickUrl ? (
              <Link to={clickUrl}>{getImageComponent()}</Link>
            ) : (
              getImageComponent()
            ))}

          {!isImageUrl(url) && <Video url={file.url} />}

          <FileDescription description={description} />
        </div>
      </LazyLoad>

      {isFirstSectionFile && !isSkipFileText && <Markdown text={text} />}
    </>
  );
};
