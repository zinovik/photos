import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getImageFilename } from '../services/helper';
import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  imagesNames?: string[];
}

export const ImageFullscreen = ({ image, imagesNames = [] }: Props) => {
  const { url } = image;
  const filename = getImageFilename(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    setSearchParams({});
  };

  const currentImageIndex = imagesNames.indexOf(filename);
  const nextImageFilename =
    currentImageIndex < imagesNames.length - 1
      ? imagesNames[currentImageIndex + 1]
      : null;
  const previousImageFilename =
    currentImageIndex > 0 ? imagesNames[currentImageIndex - 1] : null;

  return (
    <>
      <LazyLoadImage
        src={url}
        width={'800'}
        height={'600'}
        onClick={handleImageClick}
        style={{ position: 'fixed', top: 0, left: 0 }}
      />

      {imagesNames.length > 0 && (
        <>
          <br />
          {`${currentImageIndex + 1} / ${imagesNames.length}`}
          <br />
        </>
      )}

      {previousImageFilename && (
        <>
          <Link to={`?image=${previousImageFilename}`}>Back</Link>
          <br />
        </>
      )}

      {nextImageFilename && (
        <Link to={`?image=${nextImageFilename}`}>Next</Link>
      )}
    </>
  );
};
