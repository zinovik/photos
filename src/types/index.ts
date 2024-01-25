import { AlbumInterface } from './AlbumInterface';
import { FileInterface } from './FileInterface';

export interface AlbumWithFiles {
  album: AlbumInterface;
  files: FileInterface[];
}

export interface UpdatedAlbum {
  path: string;
  newPath: string;
  title: string;
  text: string | string[];
}

export interface UpdatedFile {
  filename: string;
  path: string;
  description: string;
  text: string | string[];
}

export * from './AlbumInterface';
export * from './FileInterface';
export * from './AgendaInterface';
