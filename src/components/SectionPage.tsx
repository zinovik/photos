import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { getLinks } from '../services/helper';
import { AgendaInterface, SectionWithImages } from '../types';

interface Props {
  sectionsWithImages: SectionWithImages[];
  path: string;
}

export const SectionPage = ({ sectionsWithImages, path }: Props) => {
  const links = useMemo(() => getLinks(path), [path]);

  const agenda: AgendaInterface[] = sectionsWithImages
    .map((sectionWithImages) => ({
      level: sectionWithImages.level,
      title: sectionWithImages.section.title,
      path: sectionWithImages.section.path,
    }))
    .splice(1);

  return (
    <>
      <nav>
        <br />
        <Link to="/">home</Link>
        {links.map((link) => (
          <span key={link.url}>
            {' / '}
            <Link to={link.url}>{link.text}</Link>
          </span>
        ))}
      </nav>

      <main>
        {sectionsWithImages.length === 0 && <>Loading...</>}

        {sectionsWithImages.map((sectionWithImages) => (
          <Section
            sectionWithImages={sectionWithImages}
            path={path}
            key={sectionWithImages.section.path}
            agenda={agenda}
          />
        ))}
      </main>
    </>
  );
};
