import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Markdown } from './Markdown';
import { getImageFilename, isImageUrl } from '../services/helper';
import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  isClickDisabled?: boolean;
}

export const Image = ({ image, isClickDisabled }: Props) => {
  const { url, urlThumbnail, description, text } = image;
  const filename = useMemo(() => getImageFilename(url), [url]);
  const isImage = isImageUrl(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (isClickDisabled) return;

    setSearchParams({ image: filename });
  };

  return (
    <>
      {text && <Markdown text={text} />}

      <div className="image-container">
        {isImage && (
          <LazyLoadImage
            src={urlThumbnail || url}
            height="50%"
            onClick={handleImageClick}
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              textAlign: 'center',
            }}
          />
        )}

        {!isImage && (
          <video controls>
            <source src={image.url} type="video/mp4" />
          </video>
        )}

        <p className="image-description">{description}</p>
      </div>
    </>
  );
};
