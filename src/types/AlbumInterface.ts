export interface AlbumInterface {
  path: string;
  title: string;
  filesAmount?: number;
  defaultByDate?: true;
  text?: string | string[];
  isSorted?: true;
  accesses: string[];
  order?: number;
}
