import { SectionInterface } from "./SectionInterface";
import { ImageInterface } from "./ImageInterface";

export interface SectionTree {
  section: SectionInterface;
  images: ImageInterface[];
  sections: SectionTree[];
}

export * from "./SectionInterface";
export * from "./ImageInterface";
