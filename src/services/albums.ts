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

  const albumsFiltered = [...loadedAlbums].filter((album) =>
    path ? isThisOrChildPath(album.path, path) : isTopLevelPath(album.path)
  );

  const orderByPath: { [path: string]: number } = albumsFiltered.reduce(
    (acc, album) => ({
      ...acc,
      [album.path]: album.order || 0,
    }),
    {}
  );

  const albumsSorted = albumsFiltered.sort((s1, s2): number => {
    const pathParts1 = s1.path.split('/');
    const pathParts2 = s2.path.split('/');

    for (let i = 0; i < Math.min(pathParts1.length, pathParts2.length); i++) {
      if (pathParts1[i] !== pathParts2[i]) {
        const pathCommon = pathParts1.slice(0, i).join('/');
        const path1 = `${pathCommon}/${pathParts1[i]}`;
        const path2 = `${pathCommon}/${pathParts2[i]}`;

        return orderByPath[path1] - orderByPath[path2];
      }
    }

    return pathParts1.length - pathParts2.length;
  });

  return path ? albumsSorted : [...albumsSorted].reverse();
};
