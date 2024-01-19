import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Image } from './Image';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { formatDatetime, getFilename, getThumbnail } from '../services/helper';
import { FileType } from '../constants';
import { FileInterface } from '../types';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  file: FileInterface;
  isHomePage?: boolean;
  isAlbumCover?: boolean;
  isCurrent?: boolean;
}

export const File = ({ file, isHomePage, isAlbumCover, isCurrent }: Props) => {
  const { url, type, isNoThumbnail, description, datetime, text } = file;
  const thumbnailUrl = isNoThumbnail
    ? url
    : getThumbnail(url, window.innerWidth);

  const descriptionWithDatetime = `${description}${
    description && datetime && ', '
  }${formatDatetime(datetime)}`;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleImageClick = (): void => {
    if (isAlbumCover) navigate(file.path.split('/')[0]);
    else {
      const filename = getFilename(url);
      searchParams.set('file', filename);
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      {isCurrent && (
        <div
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'black',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {type === FileType.image && (
            <Image
              url={thumbnailUrl}
              description={descriptionWithDatetime}
              onClick={handleImageClick}
            />
          )}
          {type === FileType.video && (
            <Video url={thumbnailUrl} description={descriptionWithDatetime} />
          )}
        </div>
      )}

      <div
        id={`${file.filename}${isAlbumCover ? '-title' : ''}`}
        style={{ minHeight: 200 }}
      >
        {!isAlbumCover && !isHomePage && <Markdown text={text} />}

        <LazyLoad offset={500}>
          <div style={{ textAlign: 'center' }}>
            {type === FileType.image && (
              <Image
                url={thumbnailUrl}
                description={descriptionWithDatetime}
                onClick={handleImageClick}
              />
            )}
            {type === FileType.video && (
              <Video url={thumbnailUrl} description={descriptionWithDatetime} />
            )}
          </div>
        </LazyLoad>

        <FileDescription description={descriptionWithDatetime} />

        {isAlbumCover && !isHomePage && <Markdown text={text} />}
      </div>
    </>
  );
};
