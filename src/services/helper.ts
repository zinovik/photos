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

export const filterFilesByPathOrDateRanges = ({
  loadedFiles,
  path,
  dateRanges,
}: {
  loadedFiles: FileInterface[];
  path?: string;
  dateRanges?: string[][];
}): FileInterface[] => {
  return loadedFiles.filter(
    (file) =>
      (!path ||
        (path === '/' && !dateRanges
          ? file.isTitle
          : isThisOrChildPath(file.path, path))) &&
      (!dateRanges ||
        dateRanges.some(
          ([from, to]) =>
            (!from || file.datetime.slice(0, from.length) >= from) &&
            (!to || file.datetime.slice(0, to.length) <= to)
        ))
  );
};
