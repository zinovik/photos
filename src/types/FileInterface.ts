export interface FileInterface {
  path: string;
  filename: string;
  type: 'image' | 'video';
  url: string;
  fix?: boolean;
  description?: string;
  text?: string | string[];
  order?: number;
  isVertical?: boolean;
}
