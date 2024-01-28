import { AlbumInterface } from './AlbumInterface';
import { FileInterface } from './FileInterface';

export interface AlbumWithFiles {
  album: AlbumInterface;
  files: FileInterface[];
}

export interface AddedAlbum {
  pathPart: string;
  title: string;
  text: string | string[];
  relatedPath: string;
  relation: 'after' | 'before' | 'in';
}

export interface AddedFile {
  filename: string;
  path: string;
  description: string;
  text: string | string[];
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
