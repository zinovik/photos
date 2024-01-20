import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';

export const MainRouter = () => {
  const [isHomePage, setIsHomePage] = useState(false as boolean | undefined);

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

    getAlbumsWithFiles({ path, dateRanges }).then(
      ({ albumsWithFiles, isHomePath }) => {
        setAlbumWithFiles(albumsWithFiles);
        setIsHomePage(isHomePath);
      }
    );
  }, [path, dateRangesParameter]);

  useEffect(() => {
    console.log('useEffect', scrolledToFile);

    if (albumsWithFiles.length === 0) return;

    const removeFileParam = () => {
      console.log('removeFileParam');
      searchParams.delete('file');
      setSearchParams(searchParams);
      console.log('removeEventListener removeFileParam');
      window.removeEventListener('scroll', removeFileParam);
    };

    const scrolledTo = scrolledToFile || scrolledToAlbum;

    if (scrolledTo) {
      setTimeout(() => {
        const element = document.getElementById(scrolledTo);
        if (!element) return;

        console.log('removeEventListener before scrollIntoView');
        window.removeEventListener('scroll', removeFileParam);

        console.log('scrollIntoView');
        element.scrollIntoView({
          block: scrolledToFile ? 'center' : 'nearest',
        });
        if (scrolledToFile) {
          setTimeout(
            () => {
              console.log('addEventListener');
              window.addEventListener('scroll', removeFileParam);
            },
            1000 // delay after scrolling to add a scroll listener ¯\_(ツ)_/¯
          );
        }
      }, 500); // delay after page loading to scroll to the right place ¯\_(ツ)_/¯
    }

    if (!scrolledToFile) {
      console.log('removeEventListener !scrolledToFile');
      window.removeEventListener('scroll', removeFileParam);
    }

    return () => {
      console.log('removeEventListener useEffect callback');
      window.removeEventListener('scroll', removeFileParam);
    };
  }, [
    albumsWithFiles,
    scrolledToAlbum,
    scrolledToFile,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (route !== previousRoute) {
      setPreviousRoute(route);
      if (!scrolledToFile && !scrolledToAlbum) window.scrollTo(0, 0);
    }
  }, [scrolledToFile, scrolledToAlbum, route, previousRoute, setPreviousRoute]);

  return isHomePage ? (
    <HomePage albumsWithFiles={albumsWithFiles} />
  ) : (
    <AlbumPage
      albumsWithFiles={albumsWithFiles}
      path={path}
      dateRanges={dateRanges}
      currentFile={scrolledToFile}
    />
  );
};
