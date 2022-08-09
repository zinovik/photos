export interface Photo {
  categories: string[];
  url: string;
  urlThumbnail: string;
  description: string;
  order?: number;
  text?: string;
  date?: string;
  isTitle?: boolean;
}
