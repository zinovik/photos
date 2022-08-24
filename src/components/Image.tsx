import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Video } from './Video';
import { ImageDescription } from './ImageDescription';
import { Markdown } from './Markdown';
import { getImageFilename, isImageUrl } from '../services/helper';

import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  clickUrl?: string;
}

export const Image = ({ image, clickUrl }: Props) => {
  const { url, urlThumbnail, description, text } = image;
  const filename = getImageFilename(url);
  const isImage = isImageUrl(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (clickUrl) return;

    setSearchParams({ image: filename });
  };

  const getImageComponent = () => (
    <LazyLoadImage
      src={urlThumbnail || url}
      onClick={handleImageClick}
      style={{
        objectFit: 'contain',
        maxWidth: '100%',
        textAlign: 'center',
      }}
    />
  );

  return (
    <>
      <Markdown text={text} />

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
    </>
  );
};
