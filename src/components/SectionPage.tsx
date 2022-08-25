import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { getLinks } from '../services/helper';
import { AgendaInterface, SectionWithImages } from '../types';

interface Props {
  sectionsWithImages: SectionWithImages[];
  path: string;
}

export const SectionPage = ({ sectionsWithImages, path }: Props) => {
  const links = getLinks(path);

  useEffect(() => window.scrollTo(0, 0), []);

  const agenda: AgendaInterface[] = sectionsWithImages
    .map((sectionWithImages) => ({
      level: sectionWithImages.level,
      title: sectionWithImages.section.title,
      path: sectionWithImages.section.path,
    }))
    .splice(1);

  return (
    <>
      <nav style={{ textAlign: 'right', paddingTop: '1rem' }}>
        <Link to="/">home</Link>
        {links.map((link) => (
          <span>
            {' / '}
            <Link to={link.url}>{link.text}</Link>
          </span>
        ))}
      </nav>

      {sectionsWithImages.length === 0 && <>⏳ Loading...</>}

      <main>
        {sectionsWithImages.map((sectionWithImages) => (
          <Section
            sectionWithImages={sectionWithImages}
            path={path}
            agenda={agenda}
            key={sectionWithImages.section.path}
          />
        ))}
      </main>
    </>
  );
};
