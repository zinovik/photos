import { FILE_URLS_URL } from '../constants';

let loadedFileUrls: string[] = [];

const loadFileUrls = async (): Promise<void> => {
  const response = await fetch(FILE_URLS_URL);

  loadedFileUrls = await response.json();
};

export const getFileUrls = async (): Promise<string[]> => {
  if (loadedFileUrls.length === 0) {
    await loadFileUrls();
  }

  return [...loadedFileUrls];
};
