import axios from "axios";
import { Photo } from "../types/Photo";

let loadedPhotos: Photo[] = [];

export const loadPhotos = async (): Promise<void> => {
  const response = await axios.get<Photo[]>("/data/photos.json");

  loadedPhotos = response.data;
};

export const getPhotos = async (category: string): Promise<Photo[]> => {
  if (loadedPhotos.length === 0) {
    await loadPhotos();
  }

  return [...loadedPhotos]
    .filter((photo) => photo.categories.includes(category))
    .sort((p1, p2) => (p1.order || 0) - (p2.order || 0));
};
