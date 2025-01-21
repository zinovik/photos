import { AlbumInterface } from '../types';

export const sortAlbums = (albums: AlbumInterface[]): AlbumInterface[] => {
  const rootPathsWithNotSortedSubAlbums = albums
    .filter((album) => album.isNotSorted)
    .map((album) => album.path);

  const topLevelPathsOrdered = albums
    .filter((album) => album.path.split('/').length === 1)
    .map((album) => album.path);

  return [...albums].sort((a1, a2) => {
    const a1PathParts = a1.path.split('/');
    const a2PathParts = a2.path.split('/');

    // root paths
    if (a1PathParts.length === 1 && a2PathParts.length === 1) {
      return 0;
    }

    // albums from different root paths (one can be root, doesn't matter)
    if (a1PathParts[0] !== a2PathParts[0]) {
      return (
        topLevelPathsOrdered.indexOf(a1PathParts[0]) -
        topLevelPathsOrdered.indexOf(a2PathParts[0])
      );
    }

    // the same root path

    if (
      a1.path.includes('/') &&
      a2.path.includes('/') &&
      (a1.order !== undefined || a2.order !== undefined)
    ) {
      if (a2.order === undefined) return -1;
      if (a1.order === undefined) return 1;

      return a1.order - a2.order;
    }

    // should sort sub albums
    if (!rootPathsWithNotSortedSubAlbums.includes(a1PathParts[0])) {
      if (a1PathParts.length === a2PathParts.length)
        return a1.path.localeCompare(a2.path);

      const minPathParts = Math.min(a1PathParts.length, a2PathParts.length);

      for (let i = 0; i < minPathParts; i++) {
        if (a1PathParts[i] !== a2PathParts[i]) {
          if (a1PathParts[i] === undefined) return -1;
          if (a2PathParts[i] === undefined) return 1;
          return a1PathParts[i].localeCompare(a2PathParts[i]);
        }
      }
    }

    if (a2.path.includes(a1.path)) return -1;
    if (a1.path.includes(a2.path)) return 1;

    return 0;
  });
};
