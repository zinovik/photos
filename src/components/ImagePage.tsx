import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionInterface, SectionWithImages } from '../types';
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

  const currentSection: SectionInterface = sectionsWithImages.find(
    (sectionWithImages) =>
      sectionWithImages.images.some(
        (sectionImage) => sectionImage.url === allImages[currentImageIndex].url
      )
  )?.section!; // Each image has a section because we got images from sections,

  return (
    <>
      {allImages.length === 0 && <>Loading...</>}

      {allImages.length > 0 && (
        <ImageFullscreen
          allImages={allImages}
          currentImageIndex={currentImageIndex}
          currentSection={currentSection}
        />
      )}
    </>
  );
};
