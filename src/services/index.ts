import { state } from '../state';
import { AlbumInterface, AlbumWithFiles } from '../types';
import { getLevel } from '../utils';
import { apiLoad } from './api';
import {
  filterAlbumsByPath,
  filterFilesByPathOrDateRanges,
  isThisOrChildPath,
} from './helper';

export const getFilteredAlbumsWithFiles = async ({
  path: pathRoute,
  dateRanges,
}: {
  path: string;
  dateRanges?: string[][];
}): Promise<{
  albumsWithFiles: AlbumWithFiles[];
  isHomePathAndAlbumsShowing?: boolean;
}> => {
  if (state.allAlbums.length === 0 || state.allFiles.length === 0) {
    await apiLoad();
  }

  const path = pathRoute || (dateRanges ? '' : '/');

  const albums = filterAlbumsByPath({ loadedAlbums: state.allAlbums, path });
  const files = filterFilesByPathOrDateRanges({
    loadedFiles: state.allFiles,
    path,
    dateRanges,
  });

  if (dateRanges) {
    const albumsMap: Record<string, AlbumInterface> = {};
    albums.forEach((album) => {
      albumsMap[album.path] = album;
    });

    const albumsWithFiles: AlbumWithFiles[] = [];

    files
      .sort((file1, file2) => file2.datetime.localeCompare(file1.datetime))
      .forEach((file) => {
        if (
          albumsWithFiles.length === 0 ||
          albumsWithFiles[albumsWithFiles.length - 1].album.path !== file.path
        ) {
          albumsWithFiles.push({ album: albumsMap[file.path], files: [file] });
        } else {
          albumsWithFiles[albumsWithFiles.length - 1].files.push(file);
        }
      });

    return { albumsWithFiles };
  }

  const isHomePathAndAlbumsShowing = path === '/';
  const albumsOrdered = isHomePathAndAlbumsShowing
    ? [...albums].reverse()
    : albums;

  return {
    albumsWithFiles: albumsOrdered.map((album) => ({
      album,
      files: files.filter(
        (file) =>
          (file.isTitle &&
            getLevel(album.path) === 1 &&
            isThisOrChildPath(file.path, album.path)) ||
          file.path === album.path
      ),
    })),
    isHomePathAndAlbumsShowing,
  };
};
