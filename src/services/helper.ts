import { ImageInterface, SectionWithImages } from '../types';

export const isTopLevelPath = (path: string): boolean => !path.includes('/');

export const isThisOrChildPath = (
  instancePath: string,
  searchPath: string
): boolean => instancePath.indexOf(searchPath) === 0;

export const getLinks = (path: string): { text: string; url: string }[] =>
  path
    .split('/')
    .slice(0, -1)
    .map((link, index, links) => {
      const url = `${links.slice(0, index).join('/')}/${link}`;

      return {
        text: link,
        url: `${url.startsWith('/') ? '' : '/'}${url}`,
      };
    });

export const getImageFilename = (url: string): string =>
  url.split('/').slice(-1)[0] || '';

export const isImageUrl = (url: string): boolean =>
  url.substring(url.length - 3) !== 'mp4';

export const getAllImages = (
  sectionsWithImages: SectionWithImages[]
): ImageInterface[] =>
  sectionsWithImages.reduce(
    (acc, sectionWithImages) => [...acc, ...sectionWithImages.images],
    [] as ImageInterface[]
  );

export const getDatetimeFromUrl = (url: string): string => {
  const dateTimeParsed = url.match(
    new RegExp('([\\d]{4})([\\d]{2})([\\d]{2})_([\\d]{2})([\\d]{2})')
  );

  if (!Array.isArray(dateTimeParsed)) {
    return '';
  }

  const [, year, month, date, hour, minute] = dateTimeParsed;

  return `${date}.${month}.${year} ${hour}:${minute}`;
};