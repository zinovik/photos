import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';
import { sortAlbumsWithFilesByFilenames } from '../services/helper';

export const AlbumRouter = () => {
  const { album, '*': albums = '' } = useParams();
  const { hash } = useLocation();

  const path = `${album}/${albums}`.replace(/\/+$/, '');

  const [searchParams] = useSearchParams();

  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  const dateRangesParameter = searchParams.get(PARAMETER_DATE_RANGES);

  useEffect(() => {
    const dateRanges = dateRangesParameter
      ?.split(',')
      .map((dateRange) => dateRange.split('-'));

    getAlbumsWithFiles(path, dateRanges).then((result) =>
      setAlbumWithFiles(
        dateRanges ? sortAlbumsWithFilesByFilenames(result) : result
      )
    );
  }, [path, dateRangesParameter]);

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
