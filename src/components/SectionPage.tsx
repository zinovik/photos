import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { getLinks } from '../services/helper';
import { SectionWithImages } from '../types';

interface Props {
  sectionsWithImages: SectionWithImages[];
  path: string;
}

export const SectionPage = ({ sectionsWithImages, path }: Props) => {
  const links = getLinks(path);

  return (
    <>
      <nav>
        <br />
        <Link to="/">gallery</Link>
        {links.map((link) => (
          <>
            {' / '}
            <Link to={link.url}>{link.text}</Link>
          </>
        ))}
      </nav>

      <main>
        {sectionsWithImages.length === 0 && <>Loading...</>}

        {sectionsWithImages.map((sectionWithImages) => (
          <Section
            sectionWithImages={sectionWithImages}
            path={path}
            key={sectionWithImages.section.path}
          />
        ))}
      </main>
    </>
  );
};
