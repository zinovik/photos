import React, { useContext } from 'react';
import { AlbumInterface } from '../types';
import {
  isLoggedIn,
  addUpdatedAlbum,
  addAddedAlbum,
  addAddedFile,
  addRemovedAlbum,
} from '../services/api';
import { ForceUpdateContext } from '../routers/MainRouter';

interface Props {
  album: AlbumInterface;
}

export const AdminAlbum = ({ album }: Props) => {
  const forceUpdate = useContext(ForceUpdateContext);

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
                ...(newPath === album.path ? {} : { newPath }),
                ...(newTitle === album.title ? {} : { title: newTitle }),
                ...(newTextString === oldTextString
                  ? {}
                  : {
                      text: newTextString.includes('---')
                        ? newTextString.split('---')
                        : newTextString,
                    }),
              });
              forceUpdate();
            }}
          >
            edit album
          </button>
          <button
            onClick={() => {
              const pathPart = prompt(`pathPart related to ${album.path}`);
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
            onClick={async () => {
              const filename = prompt('filename');
              if (filename === null) return;
              const description = prompt('description');
              if (description === null) return;
              const newTextString = prompt('text');
              if (newTextString === null) return;

              await addAddedFile({
                path: album.path,
                filename,
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
          <button
            onClick={() => {
              if (!window.confirm(`Remove ${album.path}?`)) return;

              addRemovedAlbum({
                path: album.path,
              });
              forceUpdate();
            }}
          >
            remove album
          </button>
        </>
      )}
    </>
  );
};
