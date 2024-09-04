import {
  getDatetimeFromFilename,
  getFileType,
  isThisOrChildPath,
  sortFiles,
} from './helper';
import { FILES_URL } from '../constants';
import {
  AlbumInterface,
  FileInterface,
  RemovedFile,
  UpdatedFile,
} from '../types';

let loadedFiles: Omit<FileInterface, 'datetime' | 'type'>[] = [];
let loadedFilesFilled: FileInterface[] = [];

const loadFiles = async (): Promise<void> => {
  const filesResponse = await fetch(FILES_URL);

  loadedFiles = await filesResponse.json();
};

const fillFiles = (files: Omit<FileInterface, 'datetime' | 'type'>[]) => {
  const mergedFiles = files.map((file) => ({
    ...file,
    type: getFileType(file.filename),
    datetime: getDatetimeFromFilename(file.filename),
  }));

  return mergedFiles;
};

export const getFiles = async (
  path?: string,
  dateRanges?: string[][]
): Promise<FileInterface[]> => {
  if (loadedFilesFilled.length === 0) {
    await loadFiles();
    loadedFilesFilled = fillFiles(loadedFiles);
  }

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
