import axios from "axios";
import { isThisOrChildPath, isTopLevelPath } from "./helper";
import { ImageInterface } from "../types";

const IMAGES_URL = "https://raw.githubusercontent.com/zinovik/gallery-data/main/images.json";

let loadedImages: ImageInterface[] = [];

const loadImages = async (): Promise<void> => {
  const response = await axios.get<ImageInterface[]>(IMAGES_URL);

  loadedImages = response.data;
};

export const getImages = async (path?: string): Promise<ImageInterface[]> => {
  if (loadedImages.length === 0) {
    await loadImages();
  }

  return [...loadedImages]
    .filter((image) =>
      path ? isThisOrChildPath(image.path, path) : isTopLevelPath(image.path)
    )
    .sort((p1, p2) => p2.order - p1.order);
};
