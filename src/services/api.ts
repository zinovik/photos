import { API_URL } from '../constants';

export let apiToken = null;

export const apiLogin = async (googleToken?: string) => {
  if (!googleToken) return;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: googleToken }),
  });

  apiToken = await response.json();
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
}) => {
  console.log({
    path,
    newPath,
    title,
    text,
  });

  const response = await fetch(`${API_URL}/gallery/album`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path,
      newPath,
      title,
      text,
    }),
  });

  const responseBody = await response.json();

  console.log(responseBody);
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
}) => {
  console.log({
    filename,
    description,
    text,
  });

  const response = await fetch(`${API_URL}/gallery/file`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filename,
      path,
      description,
      text,
    }),
  });

  const responseBody = await response.json();

  console.log(responseBody);
};

export const isLoggedIn = () => apiToken !== null;
