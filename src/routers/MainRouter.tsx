import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';

export const MainRouter = () => {
  const [currentFile, setCurrentFile] = useState(null as string | null);

  const [dateRanges, setDateRanges] = useState(
    undefined as string[][] | undefined
  );
  const [searchParams] = useSearchParams();
  const dateRangesParameter = searchParams.get(PARAMETER_DATE_RANGES);
  const scrolledToFile = searchParams.get(PARAMETER_FILE) ?? '';

  const { hash } = useLocation();
  const scrolledToAlbum = hash.substring(1);

  const { '*': route = '' } = useParams();
  const path =
    `${route}`.replace(/\/+$/, '') || (dateRangesParameter ? '' : '/');

  const [albumsWithFiles, setAlbumWithFiles] = useState([] as AlbumWithFiles[]);

  useEffect(() => {
    const dateRanges = dateRangesParameter
      ?.split(',')
      .map((dateRange) => dateRange.split('-'));

    setDateRanges(dateRanges);

    getAlbumsWithFiles({ path, dateRanges }).then((result) =>
      setAlbumWithFiles(result)
    );
  }, [path, dateRangesParameter]);

  useEffect(() => {
    const clearCurrentFile = (event: Event) => {
      window.removeEventListener('scroll', clearCurrentFile);
      setCurrentFile(null);
      event.stopPropagation();
    };

    const scrolledTo = scrolledToFile || scrolledToAlbum;
    if (scrolledTo) {
      const element = document.getElementById(scrolledTo);

      if (element)
        setTimeout(() => {
          element.scrollIntoView({
            block: scrolledToFile ? 'center' : 'nearest',
          });
          setTimeout(
            () => window.addEventListener('scroll', clearCurrentFile),
            400 // delay after scrolling to add a scroll listener
          );
        }, 400); // delay after page loading to scroll to the right place
    } else window.scrollTo(0, 0);

    return () => window.removeEventListener('scroll', clearCurrentFile);
  }, [albumsWithFiles, scrolledToAlbum, scrolledToFile, setCurrentFile]);

  useEffect(() => setCurrentFile(scrolledToFile), [scrolledToFile]);

  return dateRangesParameter || path !== '/' ? (
    <AlbumPage
      albumsWithFiles={albumsWithFiles}
      path={path}
      dateRanges={dateRanges}
      currentFile={currentFile}
      clearAlbum={() => setAlbumWithFiles([])}
    />
  ) : (
    <HomePage albumsWithFiles={albumsWithFiles} />
  );
};
