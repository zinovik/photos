import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Album } from '../components/Album';
import { getLinks } from '../services/helper';
import { AgendaInterface, AlbumWithFiles } from '../types';

interface Props {
  albumsWithFiles: AlbumWithFiles[];
  path: string;
  hash: string;
  file: string | null;
  clearAlbum: Function;
}

export const AlbumPage = ({
  albumsWithFiles,
  path,
  hash,
  file,
  clearAlbum,
}: Props) => {
  const navigate = useNavigate();

  const goHome = () => {
    clearAlbum();
    navigate('/');
  };

  const links = getLinks(path);

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
        <button onClick={goHome} className="link">
          home
        </button>
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
              isCurrentOpenedAlbum={albumWithFiles.album.path === path}
              albumAgenda={albumAgenda}
            />
          </div>
        ))}
      </main>
    </>
  );
};
