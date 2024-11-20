import { AlbumInterface, Host } from '../types';
import { PARAMETER_DATE_RANGES } from '../constants';

export const getLevel = (path: string): number => path.split('/').length;

export const getLink = (path: string, defaultByDate?: boolean) =>
  `/${path}${defaultByDate ? `?${PARAMETER_DATE_RANGES}=` : ''}`;

export const getLinks = (
  path: string,
  albums: AlbumInterface[]
): { text: string; url: string }[] =>
  path
    .split('/')
    .slice(0, -1)
    .map((text, index, texts) => {
      const textPath = texts.slice(0, index + 1).join('/');

      const album = albums.find((album) => album.path === textPath);

      const defaultByDate = album && album.defaultByDate;

      return {
        text,
        url: getLink(textPath, defaultByDate),
      };
    });

export const formatDatetime = (datetime?: string): string => {
  if (!datetime) return '';

  const date = datetime.slice(6, 8);
  const month = datetime.slice(4, 6);
  const year = datetime.slice(0, 4);
  const hour = datetime.slice(9, 11);
  const minute = datetime.slice(11, 13);

  const datePart = `${date ? `${date}.` : ''}${
    month ? `${month}.` : ''
  }${year}`;
  const timePart = ` ${hour}:${minute}`;

  return `${datePart}${hour && minute ? timePart : ''}`;
};

export const getThumbnail = (url: string, width: number): string => {
  if (url.includes(Host.cloudinary)) {
    const LEVEL = width < 400 ? '0.3' : '0.6';

    return url.replace('/upload/v', `/upload/c_scale,h_${LEVEL},w_${LEVEL}/v`);
  }

  return url;
};
