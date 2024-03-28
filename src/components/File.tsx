import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Image } from './Image';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { formatDatetime, getThumbnail } from '../services/helper';
import { FileType } from '../constants';
import { FileInterface } from '../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdminFile } from './AdminFile';

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

  const handleFileClick = (): void => {
    if (isAlbumCover) navigate(file.path.split('/')[0]);
    else {
      searchParams.set('file', file.filename);
      setSearchParams(searchParams);
    }
  };

  return (
    <>
      <AdminFile file={file} />

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
            <Image url={thumbnailUrl} description={descriptionWithDatetime} />
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

        <LazyLoad
          offset={
            Math.min(window.innerWidth, 880) * (file.isVertical ? 1.333 : 0.75)
          }
        >
          <div style={{ textAlign: 'center' }}>
            {type === FileType.image && (
              <Image
                url={thumbnailUrl}
                description={descriptionWithDatetime}
                onClick={handleFileClick}
              />
            )}
            {type === FileType.video && (
              <Video
                url={thumbnailUrl}
                description={descriptionWithDatetime}
                onClick={handleFileClick}
              />
            )}
          </div>
        </LazyLoad>

        <FileDescription description={descriptionWithDatetime} />
      </div>
    </>
  );
};
