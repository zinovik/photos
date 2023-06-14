import { getAlbums } from './albums';
import { getFiles } from './files';
import { getFileUrls } from './file-urls';
import { AlbumWithFiles } from '../types';
import { getDatetimeFromUrl } from './helper';

export const getAlbumsWithFiles = async (
  path?: string
): Promise<AlbumWithFiles[]> => {
  const [albums, files, fileUrls] = await Promise.all([
    getAlbums(path),
    getFiles(path),
    getFileUrls(),
  ]);

  return albums.map((album) => ({
    album,
    level: album.path.split('/').length,
    files: files
      .filter((file) => file.path === album.path)
      .map((file) => {
        const url =
          fileUrls.find((url) => url.includes(file.filename)) || file.filename;
        const datetime = getDatetimeFromUrl(url);

        return {
          ...file,
          url,
          description: `${file.description}${
            file.description && datetime && ', '
          }${datetime}`,
        };
      }),
  }));
};
