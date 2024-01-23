import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { getLevel } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';
import { isLoggedIn, updateAlbum } from '../services/api';

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
      {isLoggedIn() && (
        <button
          onClick={async () => {
            const newPath = prompt('path', album.path);
            const newTitle = prompt('title', album.title);
            const oldTextString = Array.isArray(album.text)
              ? album.text.join('---')
              : album.text;
            const newTextString = prompt('text', oldTextString);

            if (
              newPath !== null &&
              newTitle !== null &&
              newTextString !== null &&
              (newPath !== album.path ||
                newTitle !== album.title ||
                newTextString !== oldTextString)
            ) {
              await updateAlbum({
                path: album.path,
                newPath: newPath,
                title: newTitle,
                text: newTextString.includes('---')
                  ? newTextString.split('---')
                  : newTextString,
              });
            }

            alert('done');
          }}
        >
          edit
        </button>
      )}

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
