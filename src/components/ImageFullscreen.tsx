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
  const { url, description } = image;
  const filename = getImageFilename(url);

  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    setSearchParams({});
  };

  const currentImageIndex = imagesNames.indexOf(filename);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0 }}>
      <LazyLoadImage src={url} height={'600'} onClick={handleImageClick} />
      <p>{description}</p>

      {imagesNames.length > 1 && (
        <>
          {`${currentImageIndex + 1} / ${imagesNames.length}`}
          <br />
        </>
      )}

      {currentImageIndex > 0 && (
        <>
          <Link to={`?image=${imagesNames[currentImageIndex - 1]}`}>Back</Link>
          <br />
        </>
      )}

      {currentImageIndex < imagesNames.length - 1 && (
        <Link to={`?image=${imagesNames[currentImageIndex + 1]}`}>Next</Link>
      )}
    </div>
  );
};
