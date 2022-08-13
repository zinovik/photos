import React from 'react';
import { Link } from 'react-router-dom';
import { Markdown } from './Markdown';
import { Image } from './Image';
import { SectionWithImages } from '../types';

interface Props {
  sectionWithImages: SectionWithImages;
  path: string;
  imagesNames: string[];
}

export const Section = ({ sectionWithImages, path, imagesNames }: Props) => {
  const { section, level, images } = sectionWithImages;

  return (
    <>
      <main>
        {level === 1 && <h2>{section.path === path && section.title}</h2>}
        {level === 2 && <h3>{section.path === path && section.title}</h3>}
        {level > 2 && <h4>{section.path === path && section.title}</h4>}

        {section.path !== path && level === 1 && (
          <h2>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h2>
        )}
        {section.path !== path && level === 2 && (
          <h3>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h3>
        )}
        {section.path !== path && level > 2 && (
          <h4>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h4>
        )}

        {section.text && <Markdown text={section.text} />}

        {images.map((image) => (
          <Image image={image} imagesNames={imagesNames} key={image.url} />
        ))}
      </main>
    </>
  );
};
