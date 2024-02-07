import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { getLevel } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';
import { AdminAlbum } from './AdminAlbum';

interface Props {
  albumWithFiles: AlbumWithFiles;
  isCurrentOpenedAlbum: boolean;
  albumAgenda: AgendaInterface[];
  currentFile: string | null;
}

export const Album = ({
  albumWithFiles,
  isCurrentOpenedAlbum,
  albumAgenda,
  currentFile,
}: Props) => {
  const { album, files } = albumWithFiles;
  const level = getLevel(album.path);
  const isTopLevelAlbum = level === 1;

  return (
    <>
      <AdminAlbum album={album} />

      {isCurrentOpenedAlbum && <Title level={level}>{album.title}</Title>}

      {!isCurrentOpenedAlbum && (
        <Title level={level}>
          <Link id={album.path} to={`/${album.path}`}>
            {`${album.title} →`}
          </Link>
        </Title>
      )}

      {isCurrentOpenedAlbum && !isTopLevelAlbum && (
        <Agenda agenda={albumAgenda} />
      )}

      <Markdown text={album.text} />

      {files.map((file) => (
        <File
          file={file}
          isAlbumCover={isTopLevelAlbum}
          key={file.url}
          isCurrent={file.filename === currentFile}
        />
      ))}

      {isTopLevelAlbum && <Agenda agenda={albumAgenda} />}
    </>
  );
};
