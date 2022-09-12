import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { AgendaInterface, SectionWithFiles } from '../types';

interface Props {
  sectionWithFiles: SectionWithFiles;
  path: string;
  agenda: AgendaInterface[];
}

export const Section = ({ sectionWithFiles, path, agenda }: Props) => {
  const { section, level, files } = sectionWithFiles;

  return (
    <>
      <Title level={level}>{section.path === path && section.title}</Title>

      {section.path !== path && (
        <Title level={level}>
          <Link id={section.path} to={`/${section.path}`}>
            {`${section.title} →`}
          </Link>
        </Title>
      )}

      <Markdown text={section.text} />

      {files.map((file) => (
        <div key={file.url}>
          <File file={file} key={file.url} isFirstSectionFile={level === 1} />

          {level === 1 && <Agenda agenda={agenda} />}
        </div>
      ))}
    </>
  );
};
