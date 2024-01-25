import { isThisOrChildPath, isTopLevelPath } from './helper';
import { ALBUMS_URL } from '../constants';
import { AlbumInterface, UpdatedAlbum } from '../types';

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

export const updateAlbumLoaded = (updatedAlbum: UpdatedAlbum) => {
  loadedAlbums = loadedAlbums.map((album) =>
    album.path === updatedAlbum.path
      ? {
          ...album,
          path: updatedAlbum.newPath,
          title: updatedAlbum.title,
          text: updatedAlbum.text || undefined,
        }
      : album
  );
};
