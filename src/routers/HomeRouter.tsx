import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { AlbumWithFiles } from '../types';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { sortAlbumsWithFilesByFilenames } from '../services/helper';
import { AlbumPage } from '../pages/AlbumPage';

export const HomeRouter = () => {
  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  const [searchParams] = useSearchParams();

  const dateRangesParameter = searchParams.get(PARAMETER_DATE_RANGES);

  useEffect(() => {
    const dateRanges = dateRangesParameter
      ?.split(',')
      .map((dateRange) => dateRange.split('-'));

    getAlbumsWithFiles(dateRanges ? undefined : '/', dateRanges).then(
      (result) =>
        setAlbumWithFiles(
          dateRanges
            ? sortAlbumsWithFilesByFilenames(result)
            : [...result].reverse()
        )
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
