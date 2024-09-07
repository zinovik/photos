import { getAlbums } from './albums';
import { getFiles } from './files';
import { AlbumInterface, AlbumWithFiles } from '../types';
import { getLevel, isThisOrChildPath } from './helper';

export const getAlbumsWithFiles = async ({
  path,
  dateRanges,
  isReload,
}: {
  path: string;
  dateRanges?: string[][];
  isReload?: boolean;
}): Promise<{ albumsWithFiles: AlbumWithFiles[]; isHomePath?: boolean }> => {
  const [albums, files] = await Promise.all([
    getAlbums(path, isReload),
    getFiles({ path, dateRanges, isReload }),
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
          (file.isTitle &&
            getLevel(album.path) === 1 &&
            isThisOrChildPath(file.path, album.path)) ||
          file.path === album.path
      ),
    })),
    isHomePath,
  };
};
