import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useSearchParams } from 'react-router-dom';
import { Video } from './Video';
import { ImageDescription } from './ImageDescription';
import { Markdown } from './Markdown';
import { ImageInterface, SectionInterface } from '../types';
import { getImageFilename, isImageUrl } from '../services/helper';
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

  const close = () => setSearchParams({});

  const handleImageChange = (currentSlide: number): void => {
    setSearchParams({
      image: getImageFilename(allImages[currentSlide].url),
    });
  };

  const speed = 500;

  const settings: Settings = {
    infinite: true,
    lazyLoad: 'anticipated',
    speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    adaptiveHeight: true,
    beforeChange: (current, next) => {
      setTimeout(() => handleImageChange(next), speed);
    },
  };

  return (
    <>
      <Slider {...settings}>
        {allImages.map((image) => (
          <div key={image.url}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {isImageUrl(image.url) && (
                <img
                  src={image.url}
                  alt={image.description}
                  style={{ maxHeight: '100vh', maxWidth: '100vw' }}
                />
              )}

              {!isImageUrl(image.url) && <Video url={image.url} />}
            </div>
            <ImageDescription description={image.description} />
            <div style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
              {image.text && <Markdown text={image.text} />}
            </div>
          </div>
        ))}
      </Slider>

      <div style={{ padding: '0.5rem' }}>
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
        <div style={{ paddingTop: '1rem' }}>
          <em>{currentSection.title}</em>
        </div>
        {currentSection.text && <Markdown text={currentSection.text!} />}
      </div>
    </>
  );
};
