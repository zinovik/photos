import {
  getDatetimeFromFilename,
  getFileType,
  isThisOrChildPath,
  sortFiles,
} from './helper';
import { FILES_URL, SOURCES_CONFIG_URL } from '../constants';
import { AddedFile, FileInterface, RemovedFile, UpdatedFile } from '../types';

type SourcesConfig = Record<
  string,
  { url: string; type: 'image' | 'video' } | undefined
>;

let loadedFiles: Omit<Omit<Omit<FileInterface, 'datetime'>, 'url'>, 'type'>[] =
  [];
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

const mergeFiles = (
  files: Omit<Omit<Omit<FileInterface, 'datetime'>, 'url'>, 'type'>[],
  sourcesConfig: SourcesConfig
) => {
  const mergedFiles = files.map((file) => ({
    ...file,
    url: sourcesConfig[file.filename]?.url || file.filename,
    type: getFileType(sourcesConfig[file.filename]?.type),
    datetime: getDatetimeFromFilename(file.filename),
  }));

  return mergedFiles;
};

export const getFiles = async (
  path?: string,
  dateRanges?: string[][]
): Promise<FileInterface[]> => {
  if (loadedAndMergedFiles.length === 0) {
    await loadFiles();
    loadedAndMergedFiles = mergeFiles(loadedFiles, sourcesConfig);
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

export const removeFileLoaded = (removedFile: RemovedFile) => {
  loadedFiles = loadedFiles.filter(
    (file) => file.filename !== removedFile.filename
  );
  loadedAndMergedFiles = mergeFiles(loadedFiles, sourcesConfig);
};

export const addFileLoaded = (addedFile: AddedFile): void => {
  loadedFiles = [
    ...loadedFiles,
    {
      ...addedFile,
      text: addedFile.text || undefined,
    },
  ];
  const mergedFiles = mergeFiles(loadedFiles, sourcesConfig);

  loadedAndMergedFiles = sortFiles(mergedFiles, []); // TODO
};

export const updateFileLoaded = (updatedFile: UpdatedFile) => {
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
  const mergedFiles = mergeFiles(loadedFiles, sourcesConfig);

  loadedAndMergedFiles = sortFiles(mergedFiles, []); // TODO
};
