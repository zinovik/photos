import {
  AddedAlbum,
  AlbumInterface,
  AlbumWithFiles,
  FileInterface,
  RemovedAlbum,
  RemovedFile,
  UpdatedAlbum,
  UpdatedFile,
} from '../types';
import {
  getDatetimeFromFilename,
  getFileType,
  getLevel,
  isThisOrChildPath,
  isTopLevelPath,
  sortAlbums,
  sortFiles,
} from './helper';
import { GET_URL } from '../constants';

export let loadedAlbums: AlbumInterface[] = [];
let loadedFiles: Omit<FileInterface, 'datetime' | 'type'>[] = [];
let loadedFilesFilled: FileInterface[] = [];
export let email: string;

const load = async (): Promise<void> => {
  const response = await fetch(GET_URL, {
    headers: {
      Authorization: localStorage.getItem('csrf') || '',
    },
    credentials: 'include',
  });

  const responseJson = await response.json();
  loadedAlbums = responseJson.albums;
  loadedFiles = responseJson.files;
  email = responseJson.email;
};

export const filterAlbums = ({
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

const fillFiles = (files: Omit<FileInterface, 'datetime' | 'type'>[]) => {
  const mergedFiles = files.map((file) => ({
    ...file,
    type: getFileType(file.filename),
    datetime: getDatetimeFromFilename(file.filename),
  }));

  return mergedFiles;
};

const filterFiles = ({
  loadedFiles,
  path,
  dateRanges,
}: {
  loadedFiles: Omit<FileInterface, 'datetime' | 'type'>[];
  path?: string;
  dateRanges?: string[][];
}): FileInterface[] => {
  loadedFilesFilled = fillFiles(loadedFiles);

  return loadedFilesFilled.filter(
    (file) =>
      (!path ||
        (path === '/' ? file.isTitle : isThisOrChildPath(file.path, path))) &&
      (!dateRanges ||
        dateRanges.some(
          ([from, to]) =>
            file.datetime.slice(0, from.length) >= from &&
            (!to || file.datetime.slice(0, to.length) <= to)
        ))
  );
};

export const getAlbumsWithFiles = async ({
  path,
  dateRanges,
  isReload,
}: {
  path: string;
  dateRanges?: string[][];
  isReload?: boolean;
}): Promise<{ albumsWithFiles: AlbumWithFiles[]; isHomePath?: boolean }> => {
  if (loadedAlbums.length === 0 || loadedFiles.length === 0 || isReload) {
    await load();
  }

  const albums = filterAlbums({ loadedAlbums, path });
  const files = filterFiles({ loadedFiles, path, dateRanges });

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

export const removeAlbumLoaded = (removedAlbum: RemovedAlbum) => {
  loadedAlbums = loadedAlbums.filter(
    (album) => album.path !== removedAlbum.path
  );
};

export const addAlbumLoaded = (addedAlbum: AddedAlbum): void => {
  const albumsWithAdded = [...loadedAlbums];

  const relatedPathIndex = albumsWithAdded.findIndex(
    (album) => album.path === addedAlbum.relatedPath
  );

  if (relatedPathIndex === -1) return;

  albumsWithAdded.splice(
    relatedPathIndex + (addedAlbum.relation === 'before' ? 0 : 1),
    0,
    {
      title: addedAlbum.title,
      text: addedAlbum.text || undefined,
      path:
        addedAlbum.relation === 'in'
          ? `${addedAlbum.relatedPath}/${addedAlbum.pathPart}`
          : getLevel(addedAlbum.relatedPath) === 1
          ? addedAlbum.pathPart
          : `${addedAlbum.relatedPath.slice(
              0,
              addedAlbum.relatedPath.lastIndexOf('/')
            )}/${addedAlbum.pathPart}`,
    }
  );

  loadedAlbums = sortAlbums(albumsWithAdded);
};

export const updateAlbumLoaded = (updatedAlbum: UpdatedAlbum) => {
  const loadedAlbumsUpdated = loadedAlbums.map((album) =>
    album.path === updatedAlbum.path
      ? {
          ...album,
          ...(updatedAlbum.newPath ? { path: updatedAlbum.newPath } : {}),
          ...(updatedAlbum.title ? { title: updatedAlbum.title } : {}),
          ...(updatedAlbum.text !== undefined
            ? { text: updatedAlbum.text || undefined }
            : {}),
        }
      : album
  );

  loadedAlbums = sortAlbums(loadedAlbumsUpdated);
};

export const removeFileLoaded = (removedFile: RemovedFile) => {
  loadedFiles = loadedFiles.filter(
    (file) => file.filename !== removedFile.filename
  );
  loadedFilesFilled = fillFiles(loadedFiles);
};

export const updateFileLoaded = (
  updatedFile: UpdatedFile,
  albums: AlbumInterface[]
) => {
  loadedFiles = loadedFiles.map((file) =>
    file.filename === updatedFile.filename
      ? {
          ...file,
          ...(updatedFile.path ? { path: updatedFile.path } : {}),
          ...(updatedFile.description
            ? { description: updatedFile.description }
            : {}),
          ...(updatedFile.text !== undefined
            ? { text: updatedFile.text || undefined }
            : {}),
        }
      : file
  );
  const mergedFiles = fillFiles(loadedFiles);

  loadedFilesFilled = sortFiles(mergedFiles, albums);
};
