import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumWithFiles } from '../types';

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
        </div>
      ))}
    </main>
  );
};
