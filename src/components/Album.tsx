import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { AgendaInterface, AlbumWithFiles } from '../types';
import { AdminAlbum } from './AdminAlbum';
import { HashLink } from 'react-router-hash-link';
import { getLevel } from '../services/utils';
import { PARAMETER_DATE_RANGES } from '../constants';
import { Navigation } from './Navigation';
import { useAppSelector } from '../app/hooks';
import { selectAllAlbums } from '../app/stateSlices/allAlbumsAndFilesSlice';

interface Props {
  albumWithFiles: AlbumWithFiles;
  currentPath: string;
  albumAgenda: AgendaInterface[];
  currentFile: string | null;
  isShowingByDate?: boolean;
}

export const Album = ({
  albumWithFiles,
  currentPath,
  albumAgenda,
  currentFile,
  isShowingByDate,
}: Props) => {
  const { album, files } = albumWithFiles;
  const level = getLevel(album.path);
  const isCurrentOpenedAlbum = albumWithFiles.album.path === currentPath;
  const isCurrentAlbumTopLevelAlbum = level === 1;

  const allAlbums = useAppSelector(selectAllAlbums);
  const currentAlbum = allAlbums.find((album) => album.path === currentPath);

  return (
    <>
      <AdminAlbum album={album} />

      {isCurrentOpenedAlbum && <Title level={level}>{album.title}</Title>}

      {isCurrentOpenedAlbum && !isCurrentAlbumTopLevelAlbum && (
        <Agenda agenda={albumAgenda} />
      )}

      {!isCurrentOpenedAlbum && !isShowingByDate && (
        <Title level={level}>
          <Link
            id={album.path}
            to={`/${album.path}${
              album.defaultByDate ? `?${PARAMETER_DATE_RANGES}=` : ''
            }`}
          >
            {album.title}
          </Link>{' '}
          <HashLink to={`#${album.path}`}>#</HashLink>
        </Title>
      )}

      {!isCurrentOpenedAlbum && isShowingByDate && (
        <>
          {currentAlbum && (
            <Title level={getLevel(currentAlbum.path)}>
              {currentAlbum.title}
            </Title>
          )}
          <Title level={4}>
            <Navigation
              albumPath={album.path}
              currentPath={currentPath}
              isAlbumTitle
              align={'left'}
            />
          </Title>
        </>
      )}

      <Markdown text={album.text} />

      {files.map((file) => (
        <File
          file={file}
          key={file.url}
          isCurrent={file.filename === currentFile}
        />
      ))}

      {isCurrentAlbumTopLevelAlbum && <Agenda agenda={albumAgenda} />}
    </>
  );
};
