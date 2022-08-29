import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from './Image';
import { Markdown } from './Markdown';
import { SectionWithImages } from '../types';
import {
  LazyComponentProps,
  trackWindowScroll,
} from 'react-lazy-load-image-component';

interface Props extends LazyComponentProps {
  sectionsWithImages: SectionWithImages[];
}

const HomePageWithoutTrackWindowScroll = ({
  sectionsWithImages,
  scrollPosition,
}: Props) => {
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
              scrollPosition={scrollPosition}
            />
          ))}

          <Markdown text={section.text} />
        </div>
      ))}
    </main>
  );
};

export const HomePage = trackWindowScroll(HomePageWithoutTrackWindowScroll);
