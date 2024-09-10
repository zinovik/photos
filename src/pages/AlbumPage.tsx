import React from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../components/Album';
import { AgendaInterface, AlbumWithFiles } from '../types';
import { formatDatetime, getLinks } from '../utils';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
  path: string;
  dateRanges: string[][] | undefined;
  currentFile: string | null;
}

export const AlbumPage = ({
  albumsWithFiles,
  path,
  dateRanges,
  currentFile,
}: Props) => {
  const links = getLinks(path);

  const albumAgenda: AgendaInterface[] = albumsWithFiles
    .slice(1)
    .map((albumWithFiles) => ({
      title: albumWithFiles.album.title,
      path: albumWithFiles.album.path,
    }));

  return (
    <>
      <nav style={{ textAlign: 'right', paddingTop: '1rem' }}>
        <Link to={'/'}>home</Link>
        {links.map((link) => (
          <span key={link.url}>
            {' / '}
            <Link to={link.url}>{link.text}</Link>
          </span>
        ))}
        <div style={{ color: 'darkgray' }}>
          {dateRanges
            ?.map(
              ([from, to]) =>
                `${formatDatetime(from)} - ${formatDatetime(to) || 'now'}`
            )
            .join(', ')}
        </div>
      </nav>

      <main>
        {albumsWithFiles.length === 0 && <>⏳ Loading...</>}

        {albumsWithFiles.map((albumWithFiles) => (
          <div
            id={path}
            key={
              albumWithFiles.album.path +
              '-' +
              albumWithFiles.files.map((file) => file.filename).join(',')
            }
          >
            <Album
              albumWithFiles={albumWithFiles}
              isCurrentOpenedAlbum={albumWithFiles.album.path === path}
              albumAgenda={albumAgenda}
              currentFile={currentFile}
              isHiddenHashLink={Boolean(dateRanges)}
            />
          </div>
        ))}
      </main>
    </>
  );
};
