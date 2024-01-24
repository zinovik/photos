import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { File } from '../components/File';
import { Markdown } from '../components/Markdown';
import { AlbumWithFiles } from '../types';
import { apiLogin } from '../services/api';
import { IS_LOCAL_DEVELOPMENT } from '../constants';
import { ForceUpdateContext } from '../routers/MainRouter';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
}

export const HomePage = ({ albumsWithFiles }: Props) => {
  const forceUpdate = useContext(ForceUpdateContext);

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

      {IS_LOCAL_DEVELOPMENT ? (
        <button
          onClick={async () => {
            const isSuccess = await apiLogin('mock-google-token');
            alert(isSuccess ? 'success' : 'error');
            forceUpdate();
          }}
        >
          Sign in with Google mock
        </button>
      ) : (
        <GoogleLogin
          onSuccess={async (credentialResponse: CredentialResponse) => {
            const isSuccess = await apiLogin(credentialResponse.credential);
            alert(isSuccess ? 'success' : 'error');
            forceUpdate();
          }}
          onError={() => {
            console.error('Login Failed');
          }}
        />
      )}
    </main>
  );
};
