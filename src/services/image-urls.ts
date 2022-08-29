import axios from 'axios';

const IMAGE_URLS_URL =
  'https://raw.githubusercontent.com/zinovik/gallery-data/main/image-urls.json';

let loadedImageUrls: string[] = [];

const loadImageUrls = async (): Promise<void> => {
  const response = await axios.get<string[]>(IMAGE_URLS_URL);

  loadedImageUrls = response.data;
};

export const getImageUrls = async (path?: string): Promise<string[]> => {
  if (loadedImageUrls.length === 0) {
    await loadImageUrls();
  }

  return [...loadedImageUrls];
};
