import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumInterface } from '../types';

interface Props {
  albums: AlbumInterface[];
}

export const HomePage = ({ albums }: Props) => {
  return (
    <main>
      {albums.map(({ title, path, filesAmount }) => (
        <div key={path}>
          <h2>
            <Link to={`/${path}`}>{`${title} (${filesAmount})`}</Link>
          </h2>
        </div>
      ))}
    </main>
  );
};
