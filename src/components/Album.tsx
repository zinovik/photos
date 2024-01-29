import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Title } from './Title';
import { Markdown } from './Markdown';
import { File } from './File';
import { Agenda } from './Agenda';
import { getLevel } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';
import {
  isLoggedIn,
  addUpdatedAlbum,
  addAddedAlbum,
  addAddedFile,
} from '../services/api';
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
        <>
          <button
            onClick={() => {
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
            edit album
          </button>
          <button
            onClick={() => {
              const pathPart = prompt('pathPart');
              if (pathPart === null) return;
              const title = prompt('title');
              if (title === null) return;
              const newTextString = prompt('text');
              if (newTextString === null) return;
              const relation = prompt('relation', 'after|before|in');
              if (!['after', 'before', 'in'].includes(relation as string))
                return;

              addAddedAlbum({
                pathPart,
                title,
                text: newTextString.includes('---')
                  ? newTextString.split('---')
                  : newTextString,
                relatedPath: album.path,
                relation: relation as 'after' | 'before' | 'in',
              });
              forceUpdate();
            }}
          >
            add album
          </button>
          <button
            onClick={() => {
              const filename = prompt('filename');
              if (filename === null) return;
              const type = prompt('type', 'image|video');
              if (!['image', 'video'.includes(type as string)]) return;
              const description = prompt('description');
              if (description === null) return;
              const newTextString = prompt('text');
              if (newTextString === null) return;

              addAddedFile({
                path: album.path,
                filename,
                type: type as 'image' | 'video',
                description,
                text: newTextString.includes('---')
                  ? newTextString.split('---')
                  : newTextString,
              });
              forceUpdate();
            }}
          >
            add file
          </button>
        </>
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
