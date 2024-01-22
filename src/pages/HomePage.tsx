import React from 'react';
import { Link } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { File } from '../components/File';
import { Markdown } from '../components/Markdown';
import { AlbumWithFiles } from '../types';
import { apiLogin } from '../services/api';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
}

export const HomePage = ({ albumsWithFiles }: Props) => {
  if (albumsWithFiles.length === 0) return <>⏳ Loading...</>;

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
        onSuccess={async (credentialResponse: CredentialResponse) =>
          await apiLogin(credentialResponse.credential)
        }
        onError={() => {
          console.error('Login Failed');
        }}
      />
    </main>
  );
};
