import { getSections } from './sections';
import { getImages } from './images';
import { getImageUrls } from './image-urls';
import { SectionWithImages } from '../types';
import { getDatetimeFromUrl } from './helper';

export const getSectionsWithImages = async (
  path?: string
): Promise<SectionWithImages[]> => {
  const [sections, images, imageUrls] = await Promise.all([
    getSections(path),
    getImages(path),
    getImageUrls(path),
  ]);

  return sections.map((section) => ({
    section,
    level: section.path.split('/').length,
    images: images
      .filter((image) => image.path === section.path)
      .map((image) => {
        const url =
          imageUrls.find((url) => url.includes(image.filename)) ||
          image.filename;
        const datetime = getDatetimeFromUrl(url);

        return {
          ...image,
          url,
          description: `${image.description}${
            image.description && datetime && ', '
          }${datetime}`,
        };
      }),
  }));
};
