import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';

export const MainRouter = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const [searchParams] = useSearchParams();
  const dateRangesParameter = searchParams.get(PARAMETER_DATE_RANGES);
  const file = searchParams.get(PARAMETER_FILE);

  const { hash } = useLocation();
  const { '*': route = '' } = useParams();
  const path =
    `${route}`.replace(/\/+$/, '') || (dateRangesParameter ? '' : '/');

  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  useEffect(() => {
    const dateRanges = dateRangesParameter
      ?.split(',')
      .map((dateRange) => dateRange.split('-'));

    getAlbumsWithFiles({ path, dateRanges }).then((result) =>
      setAlbumWithFiles(result)
    );
  }, [path, dateRangesParameter]);

  return dateRangesParameter || path !== '/' ? (
    <AlbumPage
      albumsWithFiles={albumsWithFiles}
      path={path}
      hash={hash}
      file={file}
    />
  ) : (
    <HomePage albumsWithFiles={albumsWithFiles} />
  );
};
