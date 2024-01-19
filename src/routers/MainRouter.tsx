import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';

export const MainRouter = () => {
  const [dateRanges, setDateRanges] = useState(
    undefined as string[][] | undefined
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const dateRangesParameter = searchParams.get(PARAMETER_DATE_RANGES);
  const scrolledToFile = searchParams.get(PARAMETER_FILE) ?? '';

  const { hash } = useLocation();
  const scrolledToAlbum = hash.substring(1);

  const { '*': route = '' } = useParams();
  const path =
    `${route}`.replace(/\/+$/, '') || (dateRangesParameter ? '' : '/');

  const [previousRoute, setPreviousRoute] = useState(route);

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
    const removeFileParam = (event: Event) => {
      searchParams.delete('file');
      setSearchParams(searchParams);
      event.stopPropagation();
      window.removeEventListener('scroll', removeFileParam);
    };

    const scrolledTo = scrolledToFile || scrolledToAlbum;

    if (scrolledTo) {
      setTimeout(() => {
        const element = document.getElementById(scrolledTo);
        if (!element) return;

        element.scrollIntoView({
          block: scrolledToFile ? 'center' : 'nearest',
        });
        setTimeout(
          () => window.addEventListener('scroll', removeFileParam),
          500 // delay after scrolling to add a scroll listener ¯\_(ツ)_/¯
        );
      }, 500); // delay after page loading to scroll to the right place ¯\_(ツ)_/¯
    }

    return () => window.removeEventListener('scroll', removeFileParam);
  }, [scrolledToAlbum, scrolledToFile, searchParams, setSearchParams]);

  useEffect(() => {
    if (route !== previousRoute) {
      setPreviousRoute(route);
      if (!scrolledToFile && !scrolledToAlbum) window.scrollTo(0, 0);
    }
  }, [scrolledToFile, scrolledToAlbum, route, previousRoute, setPreviousRoute]);

  return dateRangesParameter || path !== '/' ? (
    <AlbumPage
      albumsWithFiles={albumsWithFiles}
      path={path}
      dateRanges={dateRanges}
      currentFile={scrolledToFile}
      clearAlbum={() => setAlbumWithFiles([])}
    />
  ) : (
    <HomePage albumsWithFiles={albumsWithFiles} />
  );
};
