import { SectionInterface } from "./SectionInterface";
import { ImageInterface } from "./ImageInterface";

export interface SectionWithImages {
  section: SectionInterface;
  level: number;
  images: ImageInterface[];
}

export * from "./SectionInterface";
export * from "./ImageInterface";
