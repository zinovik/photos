import axios from 'axios';
import { FILE_URLS_URL } from '../constants';

let loadedFileUrls: string[] = [];

const loadFileUrls = async (): Promise<void> => {
  const response = await axios.get<string[]>(FILE_URLS_URL);

  loadedFileUrls = response.data;
};

export const getFileUrls = async (): Promise<string[]> => {
  if (loadedFileUrls.length === 0) {
    await loadFileUrls();
  }

  return [...loadedFileUrls];
};
