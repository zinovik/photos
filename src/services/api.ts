import { API_URL, IS_LOCAL_DEVELOPMENT } from '../constants';
import { UpdatedAlbum, UpdatedFile } from '../types';
import { updateAlbumLoaded } from './albums';
import { updateFileLoaded } from './files';

const state = {
  apiToken: null as string | null,
  updatedAlbums: [] as UpdatedAlbum[],
  updatedFiles: [] as UpdatedFile[],
};

export const apiLogin = async (googleToken?: string): Promise<boolean> => {
  if (!googleToken) return false;

  if (IS_LOCAL_DEVELOPMENT) {
    state.apiToken = 'mock-token';
    return true;
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: googleToken }),
  });

  const json = await response.json();

  state.apiToken = json.access_token;

  return response.status < 400;
};

const apiUpdate = async (): Promise<boolean> => {
  const response = await fetch(`${API_URL}/gallery`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${state.apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      update: {
        albums: state.updatedAlbums,
        files: state.updatedFiles,
      },
    }),
  });

  state.updatedAlbums = [];
  state.updatedFiles = [];

  return response.status < 400;
};

export const updateAlbum = async (
  updatedAlbum: UpdatedAlbum
): Promise<boolean> => {
  let isUpdated = false;
  state.updatedAlbums = state.updatedAlbums.map((alreadyUpdatedAlbum) => {
    if (alreadyUpdatedAlbum.newPath === updatedAlbum.path) {
      isUpdated = true;
      return updatedAlbum;
    }
    return alreadyUpdatedAlbum;
  });
  if (!isUpdated) state.updatedAlbums.push(updatedAlbum);

  updateAlbumLoaded(updatedAlbum);

  if (IS_LOCAL_DEVELOPMENT) return true;

  return await apiUpdate(); // TODO: Move to separate action
};

export const updateFile = async (
  updatedFile: UpdatedFile
): Promise<boolean> => {
  let isUpdated = false;
  state.updatedFiles = state.updatedFiles.map((alreadyUpdatedFile) => {
    if (alreadyUpdatedFile.filename === updatedFile.filename) {
      isUpdated = true;
      return updatedFile;
    }
    return alreadyUpdatedFile;
  });
  if (!isUpdated) state.updatedFiles.push(updatedFile);

  updateFileLoaded(updatedFile);

  if (IS_LOCAL_DEVELOPMENT) return true;

  return await apiUpdate(); // TODO: Move to separate action
};

export const isLoggedIn = () => state.apiToken !== null;

export const getUpdated = () => ({
  albums: state.updatedAlbums,
  files: state.updatedFiles,
});
