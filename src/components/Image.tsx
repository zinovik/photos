import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Markdown } from './Markdown';
import { ImageFullscreen } from './ImageFullscreen';
import { getImageFilename } from '../services/helper';
import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  imagesNames?: string[];
}

export const Image = ({ image, imagesNames }: Props) => {
  const { url, urlThumbnail, description, text } = image;
  const filename = getImageFilename(url);

  const [searchParams, setSearchParams] = useSearchParams();

  const isFullScreen = filename === searchParams.get('image');

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

      {isFullScreen && (
        <ImageFullscreen image={image} imagesNames={imagesNames} />
      )}
    </>
  );
};
