import React from 'react';
import { Link } from 'react-router-dom';
import { getLinks } from '../services/utils';
import { selectAllAlbums } from '../app/stateSlices/allAlbumsAndFilesSlice';
import { useAppSelector } from '../app/hooks';

interface Props {
  path?: string;
  isLastIncluded?: boolean;
  align?: 'left';
}

export const Navigation = ({ path, isLastIncluded, align }: Props) => {
  const allAlbums = useAppSelector(selectAllAlbums);

  const links = getLinks(path || '', allAlbums, isLastIncluded);

  return (
    <nav style={{ textAlign: align || 'right', paddingTop: '1rem' }}>
      {links.map((link, index) => (
        <span key={link.url}>
          {index > 0 && ' | '}
          <Link to={link.url}>{link.text}</Link>
        </span>
      ))}
    </nav>
  );
};
