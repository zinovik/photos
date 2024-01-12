import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { AlbumWithFiles } from '../types';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumPage } from '../pages/AlbumPage';

export const HomeRouter = () => {
  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  const [searchParams] = useSearchParams();

  const dateRangesParameter = searchParams.get(PARAMETER_DATE_RANGES);

  useEffect(() => {
    const dateRanges = dateRangesParameter
      ?.split(',')
      .map((dateRange) => dateRange.split('-'));

    getAlbumsWithFiles({ path: dateRanges ? '' : '/', dateRanges }).then(
      (result) => setAlbumWithFiles(result)
    );
  }, [dateRangesParameter]);

  const file = searchParams.get(PARAMETER_FILE);

  return dateRangesParameter ? (
    <AlbumPage
      albumsWithFiles={albumsWithFiles}
      path={''}
      hash={''}
      file={file}
    />
  ) : (
    <HomePage albumsWithFiles={albumsWithFiles} />
  );
};
