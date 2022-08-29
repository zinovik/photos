import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import { Video } from './Video';
import { ImageDescription } from './ImageDescription';
import { Markdown } from './Markdown';
import { getImageFilename, isImageUrl, getThumbnail } from '../services/helper';

import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  clickUrl?: string;
  isSkipText?: boolean;
  level?: number;
  scrollPosition?: ScrollPosition;
}

export const Image = ({
  image,
  clickUrl,
  isSkipText,
  level,
  scrollPosition,
}: Props) => {
  const { url, thumbnail, description, text } = image;
  const filename = getImageFilename(url);
  const isImage = isImageUrl(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (clickUrl) return;

    setSearchParams({ image: filename });
  };

  const [src, setSrc] = useState(getThumbnail(url, thumbnail));

  const handleImageError = (): void => {
    console.log('Image loading error! Reloading...');
    setSrc('');
    setTimeout(() => setSrc(getThumbnail(url, thumbnail)), 1000);
  };

  const getImageComponent = () => (
    <LazyLoadImage
      src={src}
      onClick={handleImageClick}
      scrollPosition={scrollPosition}
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
      {level !== 1 && !isSkipText && <Markdown text={text} />}

      <div style={{ textAlign: 'center' }}>
        {isImage &&
          (clickUrl ? (
            <Link to={clickUrl}>{getImageComponent()}</Link>
          ) : (
            getImageComponent()
          ))}

        {!isImage && <Video url={image.url} />}

        <ImageDescription description={description} />
      </div>

      {level === 1 && !isSkipText && <Markdown text={text} />}
    </>
  );
};
