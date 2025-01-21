export interface AlbumInterface {
  path: string;
  title: string;
  filesAmount?: number;
  defaultByDate?: true;
  text?: string | string[];
  isNotSorted?: true; // will be removed
  order?: number;
  accesses: string[];
}
