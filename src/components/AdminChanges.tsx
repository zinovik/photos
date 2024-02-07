import React, { useContext } from 'react';
import {
  apiMediaUrlsUpdater,
  apiSend,
  getUpdated,
  isLoggedIn,
} from '../services/api';
import { ForceUpdateContext } from '../routers/MainRouter';

export const AdminChanges = () => {
  const forceUpdate = useContext(ForceUpdateContext);

  const {
    removedAlbums,
    removedFiles,
    addedAlbums,
    addedFiles,
    updatedAlbums,
    updatedFiles,
  } = getUpdated();

  return (
    <>
      {(removedAlbums.length !== 0 ||
        removedFiles.length !== 0 ||
        addedAlbums.length !== 0 ||
        addedFiles.length !== 0 ||
        updatedAlbums.length !== 0 ||
        updatedFiles.length !== 0) && (
        <>
          {removedAlbums.map((album) => (
            <div>{`Album REMOVE: ${album.path}`}</div>
          ))}
          {removedFiles.map((file) => (
            <div>{`File REMOVE: ${file.filename}`}</div>
          ))}
          {addedAlbums.map((album) => (
            <div>{`Album ADD: ${album.pathPart} | ${album.title} | ${album.text}`}</div>
          ))}
          {addedFiles.map((file) => (
            <div>{`File ADD: ${file.filename} | ${file.path} | ${file.description} | ${file.text}`}</div>
          ))}
          {updatedAlbums.map((album) => (
            <div>{`Album UPDATE: ${JSON.stringify(album)}`}</div>
          ))}
          {updatedFiles.map((file) => (
            <div>{`File UPDATE: ${JSON.stringify(file)}`}</div>
          ))}
          <button
            onClick={async () => {
              const isSuccess = await apiSend();
              alert(isSuccess ? 'success' : 'error');
              forceUpdate();
            }}
          >
            save changes
          </button>
        </>
      )}

      {isLoggedIn() && (
        <div>
          <button
            onClick={async () => {
              const isSuccess = await apiMediaUrlsUpdater();
              alert(isSuccess ? 'success' : 'error');
            }}
          >
            media urls updater
          </button>
        </div>
      )}
    </>
  );
};
