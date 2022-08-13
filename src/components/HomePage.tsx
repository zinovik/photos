import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from './Image';
import { Markdown } from './Markdown';
import { getSectionsWithImages } from '../services';
import { SectionWithImages } from '../types';

export const HomePage = () => {
  const [sectionsWithImages, setSectionsWithImages] = useState(
    [] as SectionWithImages[]
  );

  useEffect(() => {
    getSectionsWithImages().then((result) => setSectionsWithImages(result));
  }, []);

  return (
    <>
      <main>
        <p>gallery</p>
      </main>

      <nav>
        {!sectionsWithImages.length && <>Loading...</>}

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
