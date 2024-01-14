import { getAlbums } from './albums';
import { getFiles } from './files';
import { AlbumInterface, AlbumWithFiles } from '../types';

export const getAlbumsWithFiles = async ({
  path,
  dateRanges,
}: {
  path?: string;
  dateRanges?: string[][];
}): Promise<AlbumWithFiles[]> => {
  const [albums, files] = await Promise.all([
    getAlbums(path),
    getFiles(path, dateRanges),
  ]);

  if (dateRanges) {
    const albumsMap: Record<string, AlbumInterface> = {};
    albums.forEach((album) => {
      albumsMap[album.path] = album;
    });

    const albumWithFiles: AlbumWithFiles[] = [];

    files
      .sort((file1, file2) => file2.datetime.localeCompare(file1.datetime))
      .forEach((file) => {
        if (
          albumWithFiles.length === 0 ||
          albumWithFiles[albumWithFiles.length - 1].album.path !== file.path
        ) {
          albumWithFiles.push({ album: albumsMap[file.path], files: [file] });
        } else {
          albumWithFiles[albumWithFiles.length - 1].files.push(file);
        }
      });

    return albumWithFiles;
  }

  return (path === '/' ? [...albums].reverse() : albums).map((album) => ({
    album,
    level: album.path.split('/').length,
    files: files.filter(
      (file) =>
        (file.path.indexOf(album.path) === 0 && file.isTitle) ||
        file.path === album.path
    ),
  }));
};
