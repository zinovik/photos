import { AlbumInterface } from './AlbumInterface';
import { FileInterface } from './FileInterface';

export interface AlbumWithFiles {
  album: AlbumInterface;
  files: FileInterface[];
}
export * from './AlbumInterface';
export * from './FileInterface';
export * from './AgendaInterface';
