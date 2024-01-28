import React, { useContext } from 'react';
import LazyLoad from 'react-lazy-load';
import { Image } from './Image';
import { Video } from './Video';
import { FileDescription } from './FileDescription';
import { Markdown } from './Markdown';
import { formatDatetime, getFilename, getThumbnail } from '../services/helper';
import { FileType } from '../constants';
import { FileInterface } from '../types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isLoggedIn, addUpdatedFile, addAddedFile } from '../services/api';
import { ForceUpdateContext } from '../routers/MainRouter';

interface Props {
  file: FileInterface;
  isHomePage?: boolean;
  isAlbumCover?: boolean;
  isCurrent?: boolean;
}

export const File = ({ file, isHomePage, isAlbumCover, isCurrent }: Props) => {
  const forceUpdate = useContext(ForceUpdateContext);

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

      {isLoggedIn() && (
        <>
          <button
            onClick={() => {
              const newPath = prompt('path', file.path);
              if (newPath === null) return;
              const newDescription = prompt('description', description ?? '');
              if (newDescription === null) return;
              const oldTextString =
                (Array.isArray(text) ? text.join('---') : text) ?? '';
              const newTextString = prompt(
                'text',
                Array.isArray(text) ? text.join('---') : text
              );
              if (newTextString === null) return;

              if (
                newPath === file.path &&
                newDescription === description &&
                newTextString === oldTextString
              )
                return;

              addUpdatedFile({
                filename: getFilename(url),
                path: newPath,
                description: newDescription,
                text: newTextString.includes('---')
                  ? newTextString.split('---')
                  : newTextString,
              });
              forceUpdate();
            }}
          >
            edit
          </button>
          <button
            onClick={() => {
              const filename = prompt('filename');
              if (filename === null) return;
              const path = prompt('path');
              if (path === null) return;
              const description = prompt('description');
              if (description === null) return;
              const newTextString = prompt('text');
              if (newTextString === null) return;

              addAddedFile({
                filename,
                path,
                description,
                text: newTextString.includes('---')
                  ? newTextString.split('---')
                  : newTextString,
              });
              forceUpdate();
            }}
          >
            add
          </button>
        </>
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
