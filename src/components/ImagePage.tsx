import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ImageInterface, SectionInterface, SectionWithImages } from '../types';
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

  if (allImages.length === 0) return <>⏳ Loading...</>;

  const currentImageIndex = allImages.findIndex(
    (image) => getImageFilename(image.url) === currentImageFilename
  );

  const imagesWithSections: {
    image: ImageInterface;
    section: SectionInterface;
  }[] = allImages.map((image) => ({
    image,
    section: sectionsWithImages.find((sectionWithImages) =>
      sectionWithImages.images.some(
        (sectionImage) => sectionImage.url === allImages[currentImageIndex].url
      )
    )?.section!, // Each image has a section because we got images from sections
  }));

  return (
    <ImageFullscreen
      imagesWithSections={imagesWithSections}
      currentImageIndex={currentImageIndex}
    />
  );
};
