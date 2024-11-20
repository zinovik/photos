import React from 'react';
import { Link } from 'react-router-dom';
import { getLinks } from '../utils';
import { getAllAlbums } from '../state';

interface Props {
  path: string;
}

export const Navigation = ({ path }: Props) => {
  const links = getLinks(path, getAllAlbums());

  return (
    <nav style={{ textAlign: 'right', paddingTop: '1rem' }}>
      <Link to={'/'}>home</Link>
      {links.map((link) => (
        <span key={link.url}>
          {' / '}
          <Link to={link.url}>{link.text}</Link>
        </span>
      ))}
    </nav>
  );
};
