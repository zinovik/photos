import { AlbumInterface, FileInterface } from '../types';

export const isThisOrChildPath = (
  childPath: string,
  parentPath: string
): boolean =>
  childPath === parentPath || childPath.startsWith(`${parentPath}/`);

const isTopLevelPath = (path: string): boolean => !path.includes('/');

export const filterAlbumsByPath = ({
  loadedAlbums,
  path,
}: {
  loadedAlbums: AlbumInterface[];
  path: string;
}): AlbumInterface[] => {
  return path === ''
    ? loadedAlbums
    : loadedAlbums.filter((album) =>
        path === '/'
          ? isTopLevelPath(album.path)
          : isThisOrChildPath(album.path, path)
      );
};

export const filterFilesByPathAndDateRanges = ({
  loadedFiles,
  path,
  dateRanges,
}: {
  loadedFiles: FileInterface[];
  path?: string;
  dateRanges?: string[][];
}): FileInterface[] =>
  loadedFiles.filter((file) => {
    if (path && !isThisOrChildPath(file.path, path)) {
      return false;
    }

    if (
      dateRanges &&
      !dateRanges.some(
        ([from, to]) =>
          (!from || file.datetime.slice(0, from.length) >= from) &&
          (!to || file.datetime.slice(0, to.length) <= to)
      )
    ) {
      return false;
    }

    return true;
  });
