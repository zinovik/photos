export interface FileInterface {
  path: string;
  filename: string;
  type: 'image' | 'video';
  url: string;
  datetime: string;
  isNoThumbnail?: true;
  description?: string;
  text?: string | string[];
  accesses?: string[];
}
