import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from './Image';
import { Markdown } from './Markdown';
import { SectionWithImages } from '../types';

interface Props {
  sectionsWithImages: SectionWithImages[];
}

export const HomePage = ({ sectionsWithImages }: Props) => {
  return (
    <>
      <main>
        <p>gallery</p>
      </main>

      <nav>
        {sectionsWithImages.length === 0 && <>Loading...</>}

        {sectionsWithImages.map(({ section, images }) => (
          <div key={section.path}>
            <h2>
              <Link to={`/${section.path}`}>{section.title}</Link>
            </h2>

            {images.map((image) => (
              <Image image={image} key={image.url} />
            ))}

            {section.text && <Markdown text={section.text} />}
            <br />
          </div>
        ))}
      </nav>
    </>
  );
};
