import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Image } from './Image';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { isImageUrl, getThumbnail } from '../services/helper';
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
  const { url, thumbnail, description, text } = file;
  const thumbnailUrl = getThumbnail(url, window.innerWidth, thumbnail);

  return (
    <div id={file.filename} style={{ minHeight: 200 }}>
      {!isTextAfterFile && !isSkipFileText && <Markdown text={text} />}

      <LazyLoad offset={500}>
        <div style={{ textAlign: 'center' }}>
          {isImageUrl(url) && (
            <Image
              url={thumbnailUrl}
              description={description}
              clickUrl={clickUrl}
            />
          )}
          {!isImageUrl(url) && <Video url={thumbnailUrl} />}
        </div>
      </LazyLoad>

      <FileDescription description={description} />

      {isTextAfterFile && !isSkipFileText && <Markdown text={text} />}
    </div>
  );
};
