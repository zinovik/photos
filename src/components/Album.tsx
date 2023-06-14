import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { getLevel } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';

interface Props {
  albumWithFiles: AlbumWithFiles;
  path: string;
  albumAgenda: AgendaInterface[];
}

export const Album = ({ albumWithFiles, path, albumAgenda }: Props) => {
  const { album, files } = albumWithFiles;
  const level = getLevel(album.path);
  const isTopLevelAlbum = level === 1;

  return (
    <>
      {album.path === path && (
        <>
          <Title level={level}>{album.title}</Title>
          {!isTopLevelAlbum && <Agenda agenda={albumAgenda} />}
        </>
      )}

      {album.path !== path && (
        <Title level={level}>
          <Link id={album.path} to={`/${album.path}`}>
            {`${album.title} →`}
          </Link>
        </Title>
      )}

      <Markdown text={album.text} />

      {files.map((file) => (
        <File file={file} isTextAfterFile={isTopLevelAlbum} key={file.url} />
      ))}

      {isTopLevelAlbum && <Agenda agenda={albumAgenda} />}
    </>
  );
};
