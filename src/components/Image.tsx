import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Markdown } from './Markdown';
import { getImageFilename } from '../services/helper';
import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
}

export const Image = ({ image }: Props) => {
  const { url, urlThumbnail, description, text } = image;
  const filename = getImageFilename(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    setSearchParams({ image: filename });
  };

  return (
    <>
      {text && <Markdown text={text} />}

      <LazyLoadImage
        src={urlThumbnail}
        width={400}
        height={300}
        onClick={handleImageClick}
      />

      <p>{description}</p>
    </>
  );
};
