export interface AlbumInterface {
  path: string;
  title: string;
  filesAmount: number;
  text?: string | string[];
  isSorted?: true;
  accesses?: string[];
}
