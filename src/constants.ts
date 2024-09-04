export const PARAMETER_FILE = 'file';
export const PARAMETER_DATE_RANGES = 'date-ranges';

export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const API_URL = IS_LOCAL_DEVELOPMENT
  ? 'http://localhost:8080'
  : 'https://gallery-api-306312319198.europe-central2.run.app';

export const GOOGLE_OAUTH_PROVIDER_CLIENT_ID =
  '306312319198-u9h4e07khciuet8hnj00b8fvmq25rlj0.apps.googleusercontent.com';

export const ALBUMS_URL = `${API_URL}/get/albums`;
export const FILES_URL = `${API_URL}/get/files`;

export enum FileType {
  image = 'image',
  video = 'video',
}

export enum Host {
  cloudinary = 'cloudinary.com',
  mega = 'mega.nz',
}
