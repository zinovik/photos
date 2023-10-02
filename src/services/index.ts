import { getAlbums } from './albums';
import { getFiles } from './files';
import { getSourcesConfig } from './sources-config';
import { getDatetimeFromFilename } from './helper';
import { FileType } from '../constants';
import { AlbumWithFiles } from '../types';

export const getAlbumsWithFiles = async (
  path?: string
): Promise<AlbumWithFiles[]> => {
  const [albums, files, sourcesConfig] = await Promise.all([
    getAlbums(path),
    getFiles(path),
    getSourcesConfig(),
  ]);

  return albums.map((album) => ({
    album,
    level: album.path.split('/').length,
    files: files
      .filter((file) => file.path === album.path)
      .map((file) => {
        const url = sourcesConfig[file.filename]?.url || file.filename;
        const type = Object.values(FileType).includes(
          sourcesConfig[file.filename]?.type as FileType
        )
          ? (sourcesConfig[file.filename]?.type as FileType)
          : FileType.image;
        const datetime = getDatetimeFromFilename(file.filename);

        return {
          ...file,
          url,
          type,
          description: `${file.description}${
            file.description && datetime && ', '
          }${datetime}`,
        };
      }),
  }));
};
