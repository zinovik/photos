import { getSections } from './sections';
import { getImages } from './images';
import { SectionWithImages } from '../types';

export const getSectionsWithImages = async (
  path?: string
): Promise<SectionWithImages[]> => {
  const [sections, images] = await Promise.all([
    getSections(path),
    getImages(path),
  ]);

  return sections.map((section) => ({
    section,
    level: section.path.split('/').length,
    images: images.filter((image) => image.path === section.path),
  }));
};
