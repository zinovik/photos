import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getImageFilename } from '../services/helper';
import { ImageInterface } from '../types';

interface Props {
  image: ImageInterface;
  nextImageFilename?: string | null;
  previousImageFilename?: string | null;
}

export const Image = ({
  image,
  nextImageFilename,
  previousImageFilename,
}: Props) => {
  const { url, urlThumbnail, description } = image;
  const filename = getImageFilename(url);

  const [searchParams, setSearchParams] = useSearchParams();

  const isFullScreen = filename === searchParams.get('image');

  const handleImageClick = (): void => {
    setSearchParams(isFullScreen ? {} : { image: filename });
  };

  return (
    <>
      <LazyLoadImage
        src={urlThumbnail}
        width={400}
        height={300}
        onClick={handleImageClick}
      />

      {isFullScreen && (
        <>
          <LazyLoadImage
            src={url}
            width={400}
            height={300}
            onClick={handleImageClick}
            style={{ position: 'fixed', top: 0, left: 0 }}
          />
          <br />

          {previousImageFilename && (
            <Link to={`?image=${previousImageFilename}`}>Back</Link>
          )}
          <br />

          {nextImageFilename && (
            <Link to={`?image=${nextImageFilename}`}>Next</Link>
          )}
        </>
      )}
      <p>{description}</p>
    </>
  );
};
