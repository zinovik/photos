import { FileType, Host } from '../constants';

export const isTopLevelPath = (path: string): boolean => !path.includes('/');

export const isThisOrChildPath = (
  albumPath: string,
  currentPath: string
): boolean =>
  albumPath === currentPath || albumPath.startsWith(`${currentPath}/`);

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

export const getFilename = (url: string): string =>
  url.split('/').slice(-1)[0] || '';

export const isImageUrl = (url: string): boolean =>
  url.substring(url.length - 3) !== 'mp4';

export const getDatetimeFromFilename = (filename: string): string => {
  const dateTimeParsed = filename.match(
    new RegExp('([\\d]{4})([\\d]{2})([\\d]{2})_([\\d]{2})([\\d]{2})')
  );

  if (!Array.isArray(dateTimeParsed)) {
    return '';
  }

  const [, year, month, date, hour, minute] = dateTimeParsed;

  return `${year}${month}${date}_${hour}${minute}`;
};

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

export const getLevel = (path: string): number => path.split('/').length;

export const getFileType = (type?: string): FileType =>
  Object.values(FileType).includes(type as FileType)
    ? (type as FileType)
    : FileType.image;
