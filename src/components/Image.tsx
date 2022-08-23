import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Video } from './Video';
import { ImageDescription } from './ImageDescription';
import { Markdown } from './Markdown';
import { getImageFilename, isImageUrl } from '../services/helper';

import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  isClickDisabled?: boolean;
}

export const Image = ({ image, isClickDisabled }: Props) => {
  const { url, urlThumbnail, description, text } = image;
  const filename = getImageFilename(url);
  const isImage = isImageUrl(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (isClickDisabled) return;

    setSearchParams({ image: filename });
  };

  return (
    <>
      {text && <Markdown text={text} />}

      <div style={{ textAlign: 'center' }}>
        {isImage && (
          <LazyLoadImage
            src={urlThumbnail || url}
            onClick={handleImageClick}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              textAlign: 'center',
            }}
          />
        )}

        {!isImage && <Video url={image.url} />}

        <ImageDescription description={description} />
      </div>
    </>
  );
};
