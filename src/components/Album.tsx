import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { getLevel } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';
import { isLoggedIn, addUpdatedAlbum } from '../services/api';
import { ForceUpdateContext } from '../routers/MainRouter';

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
  const forceUpdate = useContext(ForceUpdateContext);

  const { album, files } = albumWithFiles;
  const level = getLevel(album.path);
  const isTopLevelAlbum = level === 1;

  return (
    <>
      {isLoggedIn() && (
        <button
          onClick={async () => {
            const newPath = prompt('path', album.path);
            if (newPath === null) return;
            const newTitle = prompt('title', album.title);
            if (newTitle === null) return;
            const oldTextString =
              (Array.isArray(album.text)
                ? album.text.join('---')
                : album.text) ?? '';
            const newTextString = prompt('text', oldTextString);
            if (newTextString === null) return;

            if (
              newPath === album.path &&
              newTitle === album.title &&
              newTextString === oldTextString
            )
              return;

            addUpdatedAlbum({
              path: album.path,
              newPath: newPath,
              title: newTitle,
              text: newTextString.includes('---')
                ? newTextString.split('---')
                : newTextString,
            });
            forceUpdate();
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
