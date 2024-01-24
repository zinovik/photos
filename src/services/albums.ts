import { isThisOrChildPath, isTopLevelPath } from './helper';
import { ALBUMS_URL } from '../constants';
import { AlbumInterface } from '../types';

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

export const replaceAlbum = ({
  path,
  newPath,
  title,
  text,
}: {
  path: string;
  newPath: string;
  title: string;
  text: string | string[];
}) => {
  loadedAlbums = loadedAlbums.map((album) =>
    album.path === path
      ? {
          ...album,
          path: newPath,
          title: title,
          text: text || undefined,
        }
      : album
  );
};
