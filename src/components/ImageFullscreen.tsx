import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useSearchParams, Link } from 'react-router-dom';
import { Video } from './Video';
import { ImageDescription } from './ImageDescription';
import { Markdown } from './Markdown';
import { ImageInterface, SectionInterface } from '../types';
import { getImageFilename, isImageUrl } from '../services/helper';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  imagesWithSections: {
    image: ImageInterface;
    section: SectionInterface;
  }[];
  currentImageIndex: number;
}

export const ImageFullscreen = ({
  imagesWithSections,
  currentImageIndex,
}: Props) => {
  const [, setSearchParams] = useSearchParams();

  const close = () => setSearchParams({});

  const handleImageChange = (currentSlide: number) =>
    setSearchParams({
      image: getImageFilename(imagesWithSections[currentSlide].image.url),
    });

  const speed = 500;
  const settings: Settings = {
    lazyLoad: 'ondemand',
    infinite: true,
    speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    adaptiveHeight: true,
    // use it because afterChange doesn't work with adaptiveHeight
    beforeChange: (_current, next) =>
      setTimeout(() => handleImageChange(next), speed),
  };

  return (
    <Slider {...settings}>
      {imagesWithSections.map(({ image, section }) => (
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

          <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
            {imagesWithSections.length > 1 && (
              <span>{`${currentImageIndex + 1} / ${
                imagesWithSections.length
              } | `}</span>
            )}
            <a href={image.url} target="_blank" rel="noreferrer">
              full size
            </a>
            {' | '}
            <button onClick={close}>close</button>
          </div>

          <Markdown text={image.text} />

          <div style={{ textAlign: 'center' }}>
            <Link id={section.path} to={`/${section.path}`}>
              {section.title}
            </Link>
          </div>

          <div style={{ paddingBottom: '1rem' }}>
            <Markdown text={section.text!} />
          </div>
        </div>
      ))}
    </Slider>
  );
};
