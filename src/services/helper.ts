import { Host } from '../constants';
import { AlbumWithFiles, FileInterface } from '../types';

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

const getDatetimeValues = (
  url: string
): '' | [string, string, string, string, string] => {
  const dateTimeParsed = url.match(
    new RegExp('([\\d]{4})([\\d]{2})([\\d]{2})_([\\d]{2})([\\d]{2})')
  );

  if (!Array.isArray(dateTimeParsed)) {
    return '';
  }

  const [, year, month, date, hour, minute] = dateTimeParsed;

  return [year, month, date, hour, minute];
};

export const getDatetimeFromFilename = (url: string): string => {
  const datetimeValues = getDatetimeValues(url);

  if (datetimeValues === '') return '';

  const [year, month, date, hour, minute] = datetimeValues;

  return `${date}.${month}.${year} ${hour}:${minute}`;
};

export const getDatetimeCodeFromFilename = (url: string): string => {
  const datetimeValues = getDatetimeValues(url);

  if (datetimeValues === '') return '';

  const [year, month, date, hour, minute] = datetimeValues;

  return `${year}${month}${date}${hour}${minute}`;
};

export const getThumbnail = (url: string, width: number): string => {
  if (url.includes(Host.cloudinary)) {
    const LEVEL = width < 400 ? '0.3' : '0.6';

    return url.replace('/upload/v', `/upload/c_scale,h_${LEVEL},w_${LEVEL}/v`);
  }

  return url;
};

export const getLevel = (path: string): number => path.split('/').length;

export const sortAlbumsWithFilesByFilenames = (
  albumsWithFiles: AlbumWithFiles[]
): AlbumWithFiles[] =>
  albumsWithFiles
    .filter((album) => album.files.length > 0)
    .reduce(
      (acc, album) => [...acc, ...album.files.map((file) => ({ ...file }))],
      [] as FileInterface[]
    )
    .sort((file1, file2) =>
      getDatetimeCodeFromFilename(file2.filename).localeCompare(
        getDatetimeCodeFromFilename(file1.filename)
      )
    )
    .reduce((acc, file) => {
      if (acc.length === 0 || acc[acc.length - 1].album.path !== file.path) {
        const { album } = albumsWithFiles.find(
          (albumWithFiles) => albumWithFiles.album.path === file.path
        ) as AlbumWithFiles;

        return [...acc, { album, files: [file] }];
      }

      const accExceptLast = acc.slice(0, acc.length - 1);
      const accLast = acc[acc.length - 1];

      return [
        ...accExceptLast,
        { ...accLast, files: [...accLast.files, file] },
      ];
    }, [] as AlbumWithFiles[]);
