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

interface Props {
  albumWithFiles: AlbumWithFiles;
  path: string;
  albumAgenda: AgendaInterface[];
  currentFile: string | null;
  isShowingByDate?: boolean;
}

export const Album = ({
  albumWithFiles,
  path,
  albumAgenda,
  currentFile,
  isShowingByDate,
}: Props) => {
  const { album, files } = albumWithFiles;
  const level = getLevel(album.path);
  const isCurrentOpenedAlbum = albumWithFiles.album.path === path;
  const isCurrentAlbumTopLevelAlbum = level === 1;

  return (
    <>
      <AdminAlbum album={album} />

      {isCurrentOpenedAlbum && <Title level={level}>{album.title}</Title>}

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
        <Title level={4}>
          <Navigation
            albumPath={album.path}
            isLastIncludedCurrentPathSkipped
            align={'left'}
          />
        </Title>
      )}

      {isCurrentOpenedAlbum && !isCurrentAlbumTopLevelAlbum && (
        <Agenda agenda={albumAgenda} />
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
