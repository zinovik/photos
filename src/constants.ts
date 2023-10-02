export const PARAMETER_FILE = 'file';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://raw.githubusercontent.com/zinovik/gallery-data/main';

export const ALBUMS_URL = `${baseUrl}/albums.json`;
export const FILES_URL = `${baseUrl}/files.json`;
export const SOURCES_CONFIG_URL = `${baseUrl}/sources-config.json`;

export enum FileType {
  image = 'image',
  video = 'video',
}

export enum Host {
  cloudinary = 'cloudinary.com',
  mega = 'mega.nz',
}
