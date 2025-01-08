import React, { useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { AlbumPage } from '../pages/AlbumPage';
import { HomePage } from '../pages/HomePage';
import { applyChanges } from '../services/applyChanges';
import { getAlbumsWithFilesToShow } from '../services/getAlbumsWithFilesToShow';
import { AdminChanges } from '../components/AdminChanges';
import { ShowMode } from '../components/ShowMode';
import { AdminLogin } from '../components/AdminLogin';
import { Navigation } from '../components/Navigation';
import { parseUrl } from '../services/utils';
import {
  apiLoad,
  selectAllAlbums,
  selectAllFiles,
  selectChanges,
  selectIsApiLoading,
  selectShouldLoad,
  setCurrentMainPath,
  setIsShowingByDate,
  setToken,
} from '../app/stateSlices/allAlbumsAndFilesSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ScrollTo } from '../components/ScrollTo';

export const MainRouter = () => {
  const dispatch = useAppDispatch();

  const isApiLoading = useAppSelector(selectIsApiLoading);
  const allAlbums = useAppSelector(selectAllAlbums);
  const allFiles = useAppSelector(selectAllFiles);
  const shouldLoad = useAppSelector(selectShouldLoad);
  const changes = useAppSelector(selectChanges);

  const { currentPath, dateRanges, scrolledToFile, scrolledToAlbum, token } =
    parseUrl(useParams(), useSearchParams()[0], useLocation());

  useEffect(() => {
    (async () => {
      dispatch(setCurrentMainPath(currentPath));
      dispatch(setIsShowingByDate(Boolean(dateRanges)));
      dispatch(setToken(token));

      if (shouldLoad) {
        await dispatch(apiLoad(false));
      }
    })();
  }, [currentPath, dateRanges, dispatch, shouldLoad, token]);

  const { albums, files } = applyChanges({
    allAlbums,
    allFiles,
    changes,
  });
  const albumsWithFilesToShow = getAlbumsWithFilesToShow({
    allAlbums: albums,
    allFiles: files,
    currentPath,
    dateRanges,
  });

  return (
    <>
      {isApiLoading && (
        <main style={{ padding: '0.5rem' }}>⏳ Loading... Please wait</main>
      )}

      {!isApiLoading && (
        <>
          <AdminChanges />
          <AdminLogin />

          {albumsWithFilesToShow.length > 0 && (
            <>
              <div style={{ textAlign: 'center' }}>
                <ShowMode dateRanges={dateRanges} currentPath={currentPath} />
              </div>

              {!dateRanges && currentPath === '' ? (
                <HomePage
                  albums={albumsWithFilesToShow.map(
                    (albumWithFiles) => albumWithFiles.album
                  )}
                />
              ) : (
                <>
                  <AlbumPage
                    albumsWithFiles={albumsWithFilesToShow}
                    currentPath={currentPath}
                    isShowingByDate={Boolean(dateRanges)}
                    currentFile={scrolledToFile}
                  />

                  <ScrollTo
                    currentPath={currentPath}
                    scrolledToAlbum={scrolledToAlbum}
                    scrolledToFile={scrolledToFile}
                  />
                </>
              )}
            </>
          )}

          {albumsWithFilesToShow.length === 0 && (
            <>
              <Navigation />
              <main style={{ padding: '1rem' }}>
                No albums or photos are available (or you don't have access to
                them). Please try logging in or adjusting the album path (or
                dates).
              </main>
            </>
          )}
        </>
      )}
    </>
  );
};
