import {
  getDatetimeCodeFromFilename,
  isThisOrChildPath,
  isTopLevelPath,
} from './helper';
import { FILES_URL } from '../constants';
import { FileInterface } from '../types';

let loadedFiles: Omit<FileInterface, 'url'>[] = [];

const loadFiles = async (): Promise<void> => {
  const response = await fetch(FILES_URL);

  loadedFiles = await response.json();
};

export const getFiles = async (
  path?: string,
  dateRanges?: string[][]
): Promise<Omit<FileInterface, 'url'>[]> => {
  if (loadedFiles.length === 0) {
    await loadFiles();
  }

  return [...loadedFiles]
    .filter(
      (file) =>
        !path ||
        (path === '/'
          ? isTopLevelPath(file.path)
          : isThisOrChildPath(file.path, path))
    )
    .filter(
      (file) =>
        !dateRanges ||
        dateRanges.some(([from, to]) => {
          const fileDateCode = getDatetimeCodeFromFilename(file.filename).slice(
            0,
            8
          );

          return fileDateCode >= from && (!to || fileDateCode <= to);
        })
    );
};
