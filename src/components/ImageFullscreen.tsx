import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useSearchParams } from 'react-router-dom';
import { Markdown } from './Markdown';
import { ImageInterface, SectionInterface } from '../types';
import { getImageFilename } from '../services/helper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  allImages: ImageInterface[];
  currentImageIndex: number;
  currentSection: SectionInterface;
}

export const ImageFullscreen = ({
  allImages,
  currentImageIndex,
  currentSection,
}: Props) => {
  const [, setSearchParams] = useSearchParams();

  const close = (): void => {
    setSearchParams({});
  };

  const handleImageChange = (currentSlide: number): void => {
    setSearchParams({
      image: getImageFilename(allImages[currentSlide].url),
    });
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    lazyLoad: 'anticipated',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    afterChange: handleImageChange,
  };

  return (
    <>
      <Slider {...settings}>
        {allImages.map((image) => (
          <>
            <div className="fullscreen-image-container">
              <img
                src={image.url}
                alt={image.description}
                style={{ maxHeight: '92vh', maxWidth: '100vw' }}
              />
            </div>
            <p className="image-description">{image.description}</p>
          </>
        ))}
      </Slider>

      <div>
        <br />
        <br />
        {allImages.length > 1 && (
          <span>{`${currentImageIndex + 1} / ${allImages.length} | `}</span>
        )}

        <a
          href={allImages[currentImageIndex].url}
          target="_blank"
          rel="noreferrer"
        >
          full size
        </a>{' '}
        <button onClick={close}>close</button>
        <p>{currentSection.title}</p>
        {currentSection.text && <Markdown text={currentSection.text!} />}
      </div>
    </>
  );
};
