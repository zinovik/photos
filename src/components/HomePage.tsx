import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from './Image';
import { Markdown } from './Markdown';
import { SectionWithImages } from '../types';

interface Props {
  sectionsWithImages: SectionWithImages[];
}

export const HomePage = ({ sectionsWithImages }: Props) => (
  <main>
    {sectionsWithImages.length === 0 && <>Loading...</>}

    {sectionsWithImages.map(({ section, images }) => (
      <div key={section.path}>
        <h1>
          <Link to={`/${section.path}`}>{section.title}</Link>
        </h1>

        {images.map((image) => (
          <Image image={image} isClickDisabled key={image.url} />
        ))}

        {section.text && <Markdown text={section.text} />}
        <br />
      </div>
    ))}
  </main>
);
