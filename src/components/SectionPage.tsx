import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Section } from './Section';
import { getLinks } from '../services/helper';
import { AgendaInterface, SectionWithImages } from '../types';
import {
  LazyComponentProps,
  trackWindowScroll,
} from 'react-lazy-load-image-component';

interface Props extends LazyComponentProps {
  sectionsWithImages: SectionWithImages[];
  path: string;
}

const SectionPageWithoutTrackWindowScroll = ({
  sectionsWithImages,
  path,
  scrollPosition,
}: Props) => {
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

      <main>
        {sectionsWithImages.length === 0 && <>⏳ Loading...</>}

        {sectionsWithImages.map((sectionWithImages) => (
          <Section
            sectionWithImages={sectionWithImages}
            path={path}
            agenda={agenda}
            key={sectionWithImages.section.path}
            scrollPosition={scrollPosition}
          />
        ))}
      </main>
    </>
  );
};

export const SectionPage = trackWindowScroll(
  SectionPageWithoutTrackWindowScroll
);
