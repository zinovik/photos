import React, { useEffect, useState, useReducer, createContext } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { HomePage } from '../pages/HomePage';
import { getAlbumsWithFiles } from '../services';
import { PARAMETER_DATE_RANGES, PARAMETER_FILE } from '../constants';
import { AlbumWithFiles } from '../types';
import { apiSend, getUpdated } from '../services/api';

export const ForceUpdateContext = createContext(() => null as any);

export const MainRouter = () => {
  const [updateKey, forceUpdate] = useReducer((x) => x + 1, 0);

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
  }, [path, dateRangesParameter, updateKey]);

  useEffect(() => {
    if (albumsWithFiles.length === 0) return;

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

        window.removeEventListener('scroll', removeFileParam);

        element.scrollIntoView({
          block: scrolledToFile ? 'center' : 'nearest',
        });
        if (scrolledToFile) {
          setTimeout(
            () => window.addEventListener('scroll', removeFileParam),
            1000 // delay after scrolling to add a scroll listener ¯\_(ツ)_/¯
          );
        }
      }, 500); // delay after page loading to scroll to the right place ¯\_(ツ)_/¯
    }

    if (!scrolledToFile) window.removeEventListener('scroll', removeFileParam);

    return () => window.removeEventListener('scroll', removeFileParam);
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

  const { addedAlbums, addedFiles, updatedAlbums, updatedFiles } = getUpdated();

  return (
    <ForceUpdateContext.Provider value={() => forceUpdate()}>
      <>
        {(addedAlbums.length !== 0 ||
          addedFiles.length !== 0 ||
          updatedAlbums.length !== 0 ||
          updatedFiles.length !== 0) && (
          <>
            {addedAlbums.map((album) => (
              <div>{`Album Add: ${album.pathPart} | ${album.title} | ${album.text}`}</div>
            ))}
            {addedFiles.map((file) => (
              <div>{`File Add: ${file.filename} | ${file.path} | ${file.description} | ${file.text}`}</div>
            ))}
            {updatedAlbums.map((album) => (
              <div>{`Album Update: ${album.newPath} | ${album.title} | ${album.text}`}</div>
            ))}
            {updatedFiles.map((file) => (
              <div>{`File Update: ${file.filename} | ${file.path} | ${file.description} | ${file.text}`}</div>
            ))}
            <button
              onClick={async () => {
                const isSuccess = await apiSend();
                alert(isSuccess ? 'success' : 'error');
                forceUpdate();
              }}
            >
              save changes
            </button>
          </>
        )}

        {isHomePage ? (
          <HomePage albumsWithFiles={albumsWithFiles} />
        ) : (
          <AlbumPage
            albumsWithFiles={albumsWithFiles}
            path={path}
            dateRanges={dateRanges}
            currentFile={scrolledToFile}
          />
        )}
      </>
    </ForceUpdateContext.Provider>
  );
};
