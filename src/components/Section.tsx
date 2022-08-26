import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { Image } from './Image';
import { Agenda } from './Agenda';
import { AgendaInterface, SectionWithImages } from '../types';

interface Props {
  sectionWithImages: SectionWithImages;
  path: string;
  agenda: AgendaInterface[];
}

export const Section = ({ sectionWithImages, path, agenda }: Props) => {
  const { section, level, images } = sectionWithImages;

  return (
    <>
      <Title level={level}>{section.path === path && section.title}</Title>

      {section.path !== path && (
        <Title level={level}>
          <Link id={section.path} to={`/${section.path}`}>
            {section.title}
          </Link>
        </Title>
      )}

      <Markdown text={section.text} />

      {images.map((image) => (
        <div key={image.url}>
          <Image image={image} key={image.url} />
          {level === 1 && <Agenda agenda={agenda} />}
        </div>
      ))}
    </>
  );
};
