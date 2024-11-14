import React from 'react';
import { Link } from 'react-router-dom';
import { AlbumInterface } from '../types';
import { PARAMETER_DATE_RANGES } from '../constants';

interface Props {
  albums: AlbumInterface[];
}

export const HomePage = ({ albums }: Props) => {
  return (
    <main>
      {albums.map(({ title, path, filesAmount, defaultByDate }) => (
        <div key={path}>
          <h2>
            <Link
              to={`/${path}${
                defaultByDate ? `?${PARAMETER_DATE_RANGES}=` : ''
              }`}
            >{`${title} (${filesAmount})`}</Link>
          </h2>
        </div>
      ))}
    </main>
  );
};
