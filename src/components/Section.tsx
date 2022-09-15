import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { getLevel } from '../services/helper';
import { AgendaInterface, SectionWithFiles } from '../types';

interface Props {
  sectionWithFiles: SectionWithFiles;
  path: string;
  sectionAgenda: AgendaInterface[];
}

export const Section = ({ sectionWithFiles, path, sectionAgenda }: Props) => {
  const { section, files } = sectionWithFiles;
  const level = getLevel(section.path);
  const isTopLevelSection = level === 1;

  return (
    <>
      {section.path === path && (
        <>
          <Title level={level}>{section.title}</Title>
          {!isTopLevelSection && <Agenda agenda={sectionAgenda} />}
        </>
      )}

      {section.path !== path && (
        <Title level={level}>
          <Link id={section.path} to={`/${section.path}`}>
            {`${section.title} →`}
          </Link>
        </Title>
      )}

      <Markdown text={section.text} />

      {files.map((file) => (
        <File file={file} isTextAfterFile={isTopLevelSection} key={file.url} />
      ))}

      {isTopLevelSection && <Agenda agenda={sectionAgenda} />}
    </>
  );
};
