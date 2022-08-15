import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionWithImages } from '../types';
import { ImageFullscreen } from './ImageFullscreen';
import { getAllImages, getImageFilename } from '../services/helper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  sectionsWithImages: SectionWithImages[];
}

export const ImagePage = ({ sectionsWithImages }: Props) => {
  const allImages = getAllImages(sectionsWithImages);

  const [searchParams] = useSearchParams();
  const currentImageFilename = searchParams.get('image');

  const currentImageIndex = allImages.findIndex(
    (image) => getImageFilename(image.url) === currentImageFilename
  );

  const sections = allImages.map(
    (image) =>
      sectionsWithImages.find((sectionWithImages) =>
        sectionWithImages.images.some(({ url }) => url === image.url)
      )?.section!
  );

  return (
    <>
      {allImages.length === 0 && <>Loading...</>}

      {allImages.length > 0 && (
        <ImageFullscreen
          allImages={allImages}
          currentImageIndex={currentImageIndex}
          sections={sections}
        />
      )}
    </>
  );
};
