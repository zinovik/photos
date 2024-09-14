import React, { useContext } from 'react';
import { getUpdated, getUser, switchEditMode } from '../state';
import {
  apiAddNewFiles,
  apiLogout,
  apiMediaUrlsUpdater,
  apiSend,
} from '../services/api';
import { ForceUpdateContext } from '../routers/MainRouter';
import { getFilteredAlbumsWithFiles } from '../services';

export const AdminInfo = () => {
  const forceUpdate = useContext(ForceUpdateContext);

  const {
    removedAlbums,
    removedFiles,
    addedAlbums,
    updatedAlbums,
    updatedFiles,
  } = getUpdated();

  const update = async (isSuccess: boolean) => {
    alert(isSuccess ? 'success' : 'error');
    await getFilteredAlbumsWithFiles({ path: '/', isReload: true });
    forceUpdate();
  };

  const user = getUser();

  return (
    <>
      {(removedAlbums.length !== 0 ||
        removedFiles.length !== 0 ||
        addedAlbums.length !== 0 ||
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
          {updatedAlbums.map((album) => (
            <div>{`Album UPDATE: ${JSON.stringify(album)}`}</div>
          ))}
          {updatedFiles.map((file) => (
            <div>{`File UPDATE: ${JSON.stringify(file)}`}</div>
          ))}
          <button
            onClick={async () => {
              const isSuccess = await apiSend();
              await update(isSuccess);
            }}
          >
            save changes
          </button>
        </>
      )}

      {user !== null && (
        <>
          <div>
            {user.email}{' '}
            <button
              onClick={async () => {
                const isSuccess = await apiLogout();
                await update(isSuccess);
              }}
            >
              logout
            </button>
          </div>
          {user.isEditAccess && (
            <>
              <div>
                <button
                  onClick={async () => {
                    switchEditMode();
                    forceUpdate();
                  }}
                >
                  switch edit mode
                </button>
              </div>
              <div>
                <button
                  onClick={async () => {
                    const isSuccess = await apiMediaUrlsUpdater();
                    await update(isSuccess);
                  }}
                >
                  media urls updater
                </button>
              </div>
              <div>
                <button
                  onClick={async () => {
                    const isSuccess = await apiAddNewFiles();
                    await update(isSuccess);
                  }}
                >
                  add new files
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
