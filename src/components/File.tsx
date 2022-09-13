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
  clickUrl?: string;
  isSkipFileText?: boolean; // used for the home page
  isFirstSectionFile?: boolean;
}

export const File = ({
  file,
  clickUrl,
  isSkipFileText,
  isFirstSectionFile,
}: Props) => {
  const { url, description, text } = file;

  return (
    <>
      {!isFirstSectionFile && !isSkipFileText && <Markdown text={text} />}

      <LazyLoad>
        <div style={{ textAlign: 'center' }}>
          {isImageUrl(url) && <Image file={file} clickUrl={clickUrl} />}
          {!isImageUrl(url) && <Video url={url} />}
        </div>
      </LazyLoad>

      <FileDescription description={description} />

      {isFirstSectionFile && !isSkipFileText && <Markdown text={text} />}
    </>
  );
};
