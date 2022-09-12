import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { File } from './File';
import { Markdown } from './Markdown';
import { SectionWithFiles } from '../types';

interface Props {
  sectionsWithFiles: SectionWithFiles[];
}

export const HomePage = ({ sectionsWithFiles }: Props) => {
  useEffect(() => window.scrollTo(0, 0), []);

  if (sectionsWithFiles.length === 0) return <>⏳ Loading...</>;

  return (
    <main>
      {sectionsWithFiles.map(({ section, files }) => (
        <div key={section.path} style={{ paddingBottom: '1rem' }}>
          <h1>
            <Link to={`/${section.path}`}>{section.title}</Link>
          </h1>

          {files.map((file) => (
            <File
              file={file}
              clickUrl={section.path}
              key={file.url}
              isSkipFileText
            />
          ))}

          <Markdown text={section.text} />
        </div>
      ))}
    </main>
  );
};
