export const PARAMETER_FILE = 'file';
export const PARAMETER_DATE_RANGES = 'date-ranges';

export const IS_LOCAL_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const API_URL =
  'https://gallery-api-306312319198.europe-central2.run.app';

const baseUrl = IS_LOCAL_DEVELOPMENT
  ? 'http://localhost:5000'
  : `${API_URL}/get`;

export const GOOGLE_OAUTH_PROVIDER_CLIENT_ID =
  '306312319198-u9h4e07khciuet8hnj00b8fvmq25rlj0.apps.googleusercontent.com';

export const ALBUMS_URL = `${baseUrl}/albums${IS_LOCAL_DEVELOPMENT ? '.json' : ''}`;
export const FILES_URL = `${baseUrl}/files${IS_LOCAL_DEVELOPMENT ? '.json' : ''}`;
export const SOURCES_CONFIG_URL = `${baseUrl}/sources-config${IS_LOCAL_DEVELOPMENT ? '.json' : ''}`;

export enum FileType {
  image = 'image',
  video = 'video',
}

export enum Host {
  cloudinary = 'cloudinary.com',
  mega = 'mega.nz',
}
