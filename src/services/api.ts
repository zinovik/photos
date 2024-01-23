import { API_URL } from '../constants';

let apiToken: string | null = null;

export const apiLogin = async (googleToken?: string) => {
  if (!googleToken) return;

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: googleToken }),
  });

  const json = await response.json();

  apiToken = json.access_token;

  alert(response.status >= 400 ? 'error' : 'success');
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

  if (response.status >= 400) alert('error');
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

  if (response.status >= 400) alert('error');
};

export const isLoggedIn = () => apiToken !== null;
