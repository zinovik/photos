export interface FileInterface {
  path: string;
  filename: string;
  url: string;
  thumbnail?: string;
  description?: string;
  text?: string | string[];
  order?: number;
}
