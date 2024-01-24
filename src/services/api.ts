import { API_URL, IS_LOCAL_DEVELOPMENT } from '../constants';
import { replaceAlbum } from './albums';
import { replaceFile } from './files';

let apiToken: string | null = null;

export const apiLogin = async (googleToken?: string): Promise<boolean> => {
  if (!googleToken) return false;

  if (IS_LOCAL_DEVELOPMENT) {
    apiToken = 'mock-token';

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

  apiToken = json.access_token;

  return response.status < 400;
};

export const updateAlbum = async ({
  path,
  newPath,
  title,
  text,
}: {
  path: string;
  newPath: string;
  title: string;
  text: string | string[];
}): Promise<boolean> => {
  replaceAlbum({
    path,
    newPath,
    title,
    text,
  });

  if (IS_LOCAL_DEVELOPMENT) return true;

  const response = await fetch(`${API_URL}/gallery/album`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        path,
        newPath,
        title,
        text,
      },
    ]),
  });

  return response.status < 400;
};

export const updateFile = async ({
  filename,
  path,
  description,
  text,
}: {
  filename: string;
  path: string;
  description: string;
  text: string | string[];
}): Promise<boolean> => {
  replaceFile({
    filename,
    path,
    description,
    text,
  });

  if (IS_LOCAL_DEVELOPMENT) return true;

  const response = await fetch(`${API_URL}/gallery/file`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        filename,
        path,
        description,
        text,
      },
    ]),
  });

  return response.status < 400;
};

export const isLoggedIn = () => apiToken !== null;
