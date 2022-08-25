import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from './Image';
import { Markdown } from './Markdown';
import { SectionWithImages } from '../types';

interface Props {
  sectionsWithImages: SectionWithImages[];
}

export const HomePage = ({ sectionsWithImages }: Props) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (sectionsWithImages.length === 0) return <>⏳ Loading...</>;

  return (
    <main>
      {sectionsWithImages.map(({ section, images }) => (
        <div key={section.path} style={{ paddingBottom: '1rem' }}>
          <h1>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h1>

          {images.map((image) => (
            <Image
              image={image}
              clickUrl={section.path}
              key={image.url}
              isSkipText
            />
          ))}

          <Markdown text={section.text} />
        </div>
      ))}
    </main>
  );
};
