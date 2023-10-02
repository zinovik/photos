import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Image } from './Image';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { getThumbnail } from '../services/helper';
import { FileType } from '../constants';
import { FileInterface } from '../types';

interface Props {
  file: FileInterface;
  clickUrl?: string; // if provided - go to on click
  isSkipFileText?: boolean; // used for the home page
  isTextAfterFile?: boolean;
}

export const File = ({
  file,
  clickUrl,
  isSkipFileText,
  isTextAfterFile,
}: Props) => {
  const { url, type, fix, description, text } = file;
  const thumbnailUrl = fix ? url : getThumbnail(url, window.innerWidth);

  return (
    <div id={file.filename} style={{ minHeight: 200 }}>
      {!isTextAfterFile && !isSkipFileText && <Markdown text={text} />}

      <LazyLoad offset={500}>
        <div style={{ textAlign: 'center' }}>
          {type === FileType.image && (
            <Image
              url={thumbnailUrl}
              description={description}
              clickUrl={clickUrl}
            />
          )}
          {type === FileType.video && (
            <Video url={thumbnailUrl} description={description} />
          )}
        </div>
      </LazyLoad>

      <FileDescription description={description} />

      {isTextAfterFile && !isSkipFileText && <Markdown text={text} />}
    </div>
  );
};
