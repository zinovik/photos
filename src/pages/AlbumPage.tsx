import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Album } from '../components/Album';
import { getLinks } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
  path: string;
  hash: string;
  file: string | null;
}

export const AlbumPage = ({ albumsWithFiles, path, hash, file }: Props) => {
  const links = getLinks(path);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    if (!hash && !file) return;
    const element = document.getElementById(file || hash.substring(1));
    if (element) element.scrollIntoView();
  }, [albumsWithFiles, hash, file]);

  const albumAgenda: AgendaInterface[] = albumsWithFiles
    .slice(1)
    .map((albumWithFiles) => ({
      title: albumWithFiles.album.title,
      path: albumWithFiles.album.path,
    }));

  return (
    <>
      <nav style={{ textAlign: 'right', paddingTop: '1rem' }}>
        <Link to="/">home</Link>
        {links.map((link) => (
          <span key={link.url}>
            {' / '}
            <Link to={link.url}>{link.text}</Link>
          </span>
        ))}
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
              path={path}
              albumAgenda={albumAgenda}
            />
          </div>
        ))}
      </main>
    </>
  );
};
