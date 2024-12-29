import React from 'react';
import { Album } from '../components/Album';
import { AgendaInterface, AlbumWithFiles } from '../types';
import { Navigation } from '../components/Navigation';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
  currentPath: string;
  isShowingByDate: boolean;
  currentFile: string | null;
}

export const AlbumPage = ({
  albumsWithFiles,
  currentPath,
  isShowingByDate,
  currentFile,
}: Props) => {
  const albumAgenda: AgendaInterface[] = albumsWithFiles
    .slice(1)
    .map((albumWithFiles) => ({
      title: albumWithFiles.album.title,
      path: albumWithFiles.album.path,
    }));

  return (
    <>
      {albumsWithFiles.length > 0 && <Navigation albumPath={currentPath} />}

      <main>
        {albumsWithFiles.map((albumWithFiles) => (
          <div
            id={currentPath}
            key={
              albumWithFiles.album.path +
              '-' +
              albumWithFiles.files.map((file) => file.filename).join(',')
            }
          >
            <Album
              albumWithFiles={albumWithFiles}
              currentPath={currentPath}
              albumAgenda={albumAgenda}
              currentFile={currentFile}
              isShowingByDate={isShowingByDate}
            />
          </div>
        ))}
      </main>
    </>
  );
};
