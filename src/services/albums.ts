import { isThisOrChildPath, isTopLevelPath, sortAlbums } from './helper';
import { ALBUMS_URL } from '../constants';
import {
  AddedAlbum,
  AlbumInterface,
  RemovedAlbum,
  UpdatedAlbum,
} from '../types';

let loadedAlbums: AlbumInterface[] = [];

const loadAlbums = async (): Promise<void> => {
  const response = await fetch(ALBUMS_URL);

  loadedAlbums = await response.json();
};

export const getAlbums = async (path?: string): Promise<AlbumInterface[]> => {
  if (loadedAlbums.length === 0) {
    await loadAlbums();
  }

  return loadedAlbums.filter(
    (album) =>
      !path ||
      (path === '/'
        ? isTopLevelPath(album.path)
        : isThisOrChildPath(album.path, path))
  );
};

export const addAlbumLoaded = (addedAlbum: AddedAlbum): void => {
  const albumsWithAdded = [...loadedAlbums];

  const relatedPathIndex = albumsWithAdded.findIndex(
    (album) => album.path === addedAlbum.relatedPath
  );

  if (relatedPathIndex === -1) return;

  albumsWithAdded.splice(
    relatedPathIndex + (addedAlbum.relation === 'before' ? 0 : 1),
    0,
    {
      title: addedAlbum.title,
      text: addedAlbum.text || undefined,
      path:
        addedAlbum.relation === 'in'
          ? `${addedAlbum.relatedPath}/${addedAlbum.pathPart}`
          : `${addedAlbum.relatedPath.slice(
              0,
              addedAlbum.relatedPath.lastIndexOf('/')
            )}/${addedAlbum.pathPart}`,
    }
  );

  loadedAlbums = sortAlbums(albumsWithAdded);
};

export const updateAlbumLoaded = (updatedAlbum: UpdatedAlbum) => {
  const loadedAlbumsUpdated = loadedAlbums.map((album) =>
    album.path === updatedAlbum.path
      ? {
          ...album,
          path: updatedAlbum.newPath,
          title: updatedAlbum.title,
          text: updatedAlbum.text || undefined,
        }
      : album
  );

  loadedAlbums = sortAlbums(loadedAlbumsUpdated);
};

export const removeAlbumLoaded = (removedAlbum: RemovedAlbum) => {
  loadedAlbums = loadedAlbums.filter(
    (album) => album.path !== removedAlbum.path
  );
};
