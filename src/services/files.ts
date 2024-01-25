import {
  getDatetimeFromFilename,
  getFileType,
  isThisOrChildPath,
} from './helper';
import { FILES_URL, SOURCES_CONFIG_URL } from '../constants';
import { FileInterface, UpdatedFile } from '../types';

type SourcesConfig = Record<
  string,
  { url: string; type: 'image' | 'video' } | undefined
>;

let loadedFiles: Omit<Omit<FileInterface, 'datetime'>, 'url'>[] = [];
let sourcesConfig: SourcesConfig = {};
let loadedAndMergedFiles: FileInterface[] = [];

const loadFiles = async (): Promise<void> => {
  const [filesResponse, sourcesConfigResponse] = await Promise.all([
    fetch(FILES_URL),
    fetch(SOURCES_CONFIG_URL),
  ]);

  [loadedFiles, sourcesConfig] = await Promise.all([
    filesResponse.json(),
    sourcesConfigResponse.json(),
  ]);
};

const mergeFiles = () => {
  loadedAndMergedFiles = loadedFiles.map(
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
  if (loadedAndMergedFiles.length === 0) {
    await loadFiles();
    mergeFiles();
  }

  return loadedAndMergedFiles.filter(
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

export const updateFileLoaded = (updatedFile: UpdatedFile) => {
  loadedFiles = loadedFiles.map((file) =>
    file.filename === updatedFile.filename
      ? {
          ...file,
          path: updatedFile.path,
          description: updatedFile.description,
          text: updatedFile.text || undefined,
        }
      : file
  );
  mergeFiles();
};
