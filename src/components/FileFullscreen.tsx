import React from 'react';
import Slider, { Settings } from 'react-slick';
import { useSearchParams, Link } from 'react-router-dom';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { getFilename, isImageUrl } from '../services/helper';
import { PARAMETER_NAME } from '../constants';
import { FileInterface, SectionInterface } from '../types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  filesWithSections: {
    file: FileInterface;
    section: SectionInterface;
  }[];
  currentFileIndex: number;
}

export const FileFullscreen = ({
  filesWithSections,
  currentFileIndex,
}: Props) => {
  const [, setSearchParams] = useSearchParams();

  const close = () => setSearchParams({});

  const handleFileChange = (currentSlide: number) =>
    setSearchParams({
      [PARAMETER_NAME]: getFilename(filesWithSections[currentSlide].file.url),
    });

  const speed = 500;
  const settings: Settings = {
    lazyLoad: 'ondemand',
    infinite: true,
    speed,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentFileIndex,
    adaptiveHeight: true,
    // use it because afterChange doesn't work with adaptiveHeight
    beforeChange: (_current, next) =>
      setTimeout(() => handleFileChange(next), speed),
  };

  return (
    <Slider {...settings}>
      {filesWithSections.map(({ file, section }) => (
        <div key={file.url}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {isImageUrl(file.url) && (
              <img
                src={file.url}
                alt={file.description}
                style={{ maxHeight: '100vh', maxWidth: '100%' }}
              />
            )}

            {!isImageUrl(file.url) && <Video url={file.url} />}
          </div>

          <FileDescription description={file.description} />

          <div style={{ textAlign: 'center', paddingBottom: '1rem' }}>
            {filesWithSections.length > 1 && (
              <span>{`${currentFileIndex + 1} / ${
                filesWithSections.length
              } | `}</span>
            )}
            <a href={file.url} target="_blank" rel="noreferrer">
              full size
            </a>
            {' | '}
            <button onClick={close}>close</button>
          </div>

          <Markdown text={file.text} />

          <div style={{ textAlign: 'center' }}>
            <Link id={section.path} to={`/${section.path}`}>
              {`${section.title} →`}
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
