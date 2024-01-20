import { getAlbums } from './albums';
import { getFiles } from './files';
import { AlbumInterface, AlbumWithFiles } from '../types';
import { isThisOrChildPath } from './helper';

export const getAlbumsWithFiles = async ({
  path,
  dateRanges,
}: {
  path?: string;
  dateRanges?: string[][];
}): Promise<{ albumsWithFiles: AlbumWithFiles[]; isHomePath?: boolean }> => {
  const [albums, files] = await Promise.all([
    getAlbums(path),
    getFiles(path, dateRanges),
  ]);

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

  const isHomePath = path === '/';
  const albumsOrdered = isHomePath ? [...albums].reverse() : albums;

  return {
    albumsWithFiles: albumsOrdered.map((album) => ({
      album,
      files: files.filter(
        (file) =>
          (isThisOrChildPath(file.path, album.path) && file.isTitle) ||
          file.path === album.path
      ),
    })),
    isHomePath,
  };
};
