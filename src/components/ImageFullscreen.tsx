import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useSearchParams } from 'react-router-dom';
import { ImageInterface, SectionInterface } from '../types';
import { getImageFilename } from '../services/helper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  allImages: ImageInterface[];
  currentImageIndex: number;
  sections: SectionInterface[];
}

export const ImageFullscreen = ({
  allImages,
  currentImageIndex,
  sections,
}: Props) => {
  const [, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    setSearchParams({});
  };

  const handleImageChange = (currentSlide: number): void => {
    setSearchParams({ image: getImageFilename(allImages[currentSlide].url) });
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    afterChange: handleImageChange,
  };

  return (
    <Slider {...settings}>
      {allImages.map((image, index) => (
        <div>
          <img
            src={image.url}
            height={'600'}
            onClick={handleImageClick}
            alt={image.description}
          />

          <p>{image.description}</p>

          {allImages.length > 1 && (
            <p>{`${index + 1} / ${allImages.length}`}</p>
          )}

          <p>{sections[index].title}</p>

          {sections[index].text && <p>{sections[index].text}</p>}
        </div>
      ))}
    </Slider>
  );
};
