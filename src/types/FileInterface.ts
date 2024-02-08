export interface FileInterface {
  path: string;
  filename: string;
  type: 'image' | 'video';
  url: string;
  datetime: string;
  isTitle?: true;
  isNoThumbnail?: true;
  description: string;
  text?: string | string[];
  isVertical?: true;
}
