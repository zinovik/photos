import {
  getDatetimeFromFilename,
  getFileType,
  isThisOrChildPath,
  isTopLevelPath,
} from './helper';
import { FILES_URL, SOURCES_CONFIG_URL } from '../constants';
import { FileInterface } from '../types';

let loadedFiles: FileInterface[] = [];

const loadAndMergeFiles = async (): Promise<void> => {
  const [filesResponse, sourcesConfigResponse] = await Promise.all([
    fetch(FILES_URL),
    fetch(SOURCES_CONFIG_URL),
  ]);

  const [files, sourcesConfig] = await Promise.all([
    filesResponse.json(),
    sourcesConfigResponse.json(),
  ]);

  loadedFiles = files.map(
    (file: Omit<Omit<FileInterface, 'datetime'>, 'url'>) => ({
      ...file,
      url: sourcesConfig[file.filename]?.url || file.filename,
      type: getFileType(sourcesConfig[file.filename]?.type),
      datetime: getDatetimeFromFilename(file.filename),
    })
  );
};

export const getFiles = async (
  path?: string,
  dateRanges?: string[][]
): Promise<FileInterface[]> => {
  if (loadedFiles.length === 0) {
    await loadAndMergeFiles();
  }

  return loadedFiles.filter(
    (file) =>
      (!path ||
        (path === '/'
          ? isTopLevelPath(file.path)
          : isThisOrChildPath(file.path, path))) &&
      (!dateRanges ||
        dateRanges.some(([from, to]) => {
          const fileDatetime = file.datetime.slice(0, from.length);

          return fileDatetime >= from && (!to || fileDatetime <= to);
        }))
  );
};
