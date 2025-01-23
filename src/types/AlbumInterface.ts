export interface AlbumInterface {
  path: string;
  title: string;
  filesAmount?: number;
  defaultByDate?: true;
  text?: string | string[];
  accesses: string[];
  order?: number;
}
