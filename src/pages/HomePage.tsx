import React from 'react';
import { Link } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { File } from '../components/File';
import { Markdown } from '../components/Markdown';
import { AlbumWithFiles } from '../types';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
}

export const HomePage = ({ albumsWithFiles }: Props) => {
  if (albumsWithFiles.length === 0) return <>⏳ Loading...</>;

  const API_URL = 'https://storage-json-editor-api-wniawguk3a-uc.a.run.app';

  const googleSignInHandler = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(credentialResponse);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    });

    const token = await response.json();

    console.log(token);
  };

  return (
    <main>
      {albumsWithFiles.map(({ album, files }) => (
        <div key={album.path} style={{ paddingBottom: '1rem' }}>
          <h1>
            <Link to={`/${album.path}`}>{album.title}</Link>
          </h1>

          {files.map((file) => (
            <File file={file} key={file.url} isHomePage isAlbumCover />
          ))}

          <Markdown text={album.text} />
        </div>
      ))}
      <GoogleLogin
        onSuccess={googleSignInHandler}
        onError={() => {
          console.error('Login Failed');
        }}
      />
    </main>
  );
};
