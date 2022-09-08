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
  isSkipImageText?: boolean; // used for the home page
  isFirstSectionImage?: boolean;
  scrollPosition?: ScrollPosition;
}

export const Image = ({
  image,
  clickUrl,
  isSkipImageText,
  isFirstSectionImage,
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
      {!isFirstSectionImage && !isSkipImageText && <Markdown text={text} />}

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

      {isFirstSectionImage && !isSkipImageText && <Markdown text={text} />}
    </>
  );
};
