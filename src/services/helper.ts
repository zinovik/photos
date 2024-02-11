import { FileType, Host } from '../constants';
import { AlbumInterface, FileInterface } from '../types';

export const isTopLevelPath = (path: string): boolean => !path.includes('/');

export const isThisOrChildPath = (
  childPath: string,
  parentPath: string
): boolean =>
  childPath === parentPath || childPath.startsWith(`${parentPath}/`);

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

export const getFileType = (filename: string): FileType =>
  ['mp4'].includes(filename.split('.').pop() || '')
    ? FileType.video
    : FileType.image;

export const sortAlbums = (albums: AlbumInterface[]): AlbumInterface[] => {
  const sortedAlbums = albums
    .filter((album) => album.isSorted)
    .map((album) => album.path);

  const topLevelAlbums = albums
    .filter((album) => album.path.split('/').length === 1)
    .map((album) => album.path);

  return [...albums].sort((a1, a2) => {
    const a1PathParts = a1.path.split('/');
    const a2PathParts = a2.path.split('/');

    if (a1PathParts.length === 1 && a2PathParts.length === 1) {
      return 0;
    }

    if (a1PathParts[0] !== a2PathParts[0]) {
      return (
        topLevelAlbums.indexOf(a1PathParts[0]) -
        topLevelAlbums.indexOf(a2PathParts[0])
      );
    }

    // the same root path

    // is sorted album
    if (sortedAlbums.includes(a1PathParts[0])) {
      if (a1PathParts.length === a2PathParts.length)
        return a1.path.localeCompare(a2.path);

      const minPathParts = Math.min(a1PathParts.length, a2PathParts.length);

      for (let i = 0; i < minPathParts; i++) {
        if (a1PathParts[i] !== a2PathParts[i]) {
          if (a1PathParts[i] === undefined) return -1;
          if (a2PathParts[i] === undefined) return 1;
          return a1PathParts[i].localeCompare(a2PathParts[i]);
        }
      }
    }

    if (a2.path.includes(a1.path)) return -1;
    if (a1.path.includes(a2.path)) return 1;

    return 0;
  });
};

export const sortFiles = (
  files: FileInterface[],
  albums: AlbumInterface[]
): FileInterface[] => {
  const albumPaths = albums.map((album) => album.path);

  return [...files].sort((f1, f2) =>
    f1.path.split('/')[0] === f2.path.split('/')[0] // the same root path
      ? f1.filename.localeCompare(f2.filename)
      : albumPaths.indexOf(f1.path) - albumPaths.indexOf(f2.path)
  );
};
