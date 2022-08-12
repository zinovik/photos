import { SectionWithImages } from "../types";

export const isTopLevelPath = (path: string): boolean => !path.includes("/");

export const isThisOrChildPath = (
  instancePath: string,
  searchPath: string
): boolean => instancePath.indexOf(searchPath) === 0;

export const getLinks = (path: string): { text: string; url: string }[] =>
  path
    .split("/")
    .slice(0, -1)
    .map((link, index, links) => {
      const url = `${links.slice(0, index).join("/")}/${link}`;

      return {
        text: link,
        url: `${url.startsWith("/") ? "" : "/"}${url}`,
      };
    });

export const getImageFilename = (url: string): string =>
  url.split("/").slice(-1)[0] || "";

export const getImagesFilenames = (
  sectionsWithImages: SectionWithImages[]
): string[] =>
  sectionsWithImages.reduce(
    (acc: string[], sectionWithImages) => [
      ...acc,
      ...sectionWithImages.images.map((image) => getImageFilename(image.url)),
    ],
    []
  );
