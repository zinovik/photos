import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';

export const AlbumRouter = () => {
  const { album, '*': albums = '' } = useParams();
  const { hash } = useLocation();

  const path = `${album}/${albums}`.replace(/\/+$/, '');

  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  useEffect(() => {
    getAlbumsWithFiles(path).then((result) => setAlbumWithFiles(result));
  }, [path]);

  const [searchParams] = useSearchParams();

  const file = searchParams.get(PARAMETER_FILE);

  return (
    <AlbumPage
      albumsWithFiles={albumsWithFiles}
      path={path}
      hash={hash}
      file={file}
    />
  );
};
