export interface FileInterface {
  path: string;
  filename: string;
  type: 'image' | 'video';
  url: string;
  datetime: string;
  isTitle?: boolean;
  isNoThumbnail?: boolean;
  description?: string;
  text?: string | string[];
  isVertical?: boolean;
}
