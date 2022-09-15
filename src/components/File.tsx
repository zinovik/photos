import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Image } from './Image';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { isImageUrl } from '../services/helper';

import { FileInterface } from '../types';

interface Props {
  file: FileInterface;
  clickUrl?: string; // if provided - go to, else - open the file fullscreen
  isSkipFileText?: boolean; // used for the home page
  isTextAfterFile?: boolean;
}

export const File = ({
  file,
  clickUrl,
  isSkipFileText,
  isTextAfterFile,
}: Props) => {
  const { url, description, text } = file;

  return (
    <>
      {!isTextAfterFile && !isSkipFileText && <Markdown text={text} />}

      <LazyLoad offset={500}>
        <div style={{ textAlign: 'center' }}>
          {isImageUrl(url) && <Image file={file} clickUrl={clickUrl} />}
          {!isImageUrl(url) && <Video url={url} />}
        </div>
      </LazyLoad>

      <FileDescription description={description} />

      {isTextAfterFile && !isSkipFileText && <Markdown text={text} />}
    </>
  );
};
