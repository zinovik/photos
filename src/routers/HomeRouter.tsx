import React, { useEffect, useState } from 'react';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { AlbumWithFiles } from '../types';

export const HomeRouter = () => {
  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  useEffect(() => {
    getAlbumsWithFiles().then((result) => setAlbumWithFiles(result));
  }, []);

  return <HomePage albumsWithFiles={albumsWithFiles} />;
};
