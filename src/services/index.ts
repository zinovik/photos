import { getSections } from "./sections";
import { getImages } from "./images";
import { isTopLevelPath, getParentPath } from "./helper";
import { SectionTree } from "../types";

export const getSectionsWithImages = async (
  path?: string
): Promise<SectionTree[]> => {
  const [sections, images] = await Promise.all([
    getSections(path),
    getImages(path),
  ]);

  const sectionTrees: SectionTree[] = sections.map((section) => ({
    section,
    images: images.filter((image) => image.path === section.path),
    children: [],
  }));

  const sectionByPath: { [path: string]: SectionTree } = sectionTrees.reduce(
    (acc, sectionTree) => ({
      ...acc,
      [sectionTree.section.path]: sectionTree,
    }),
    {}
  );

  sectionTrees.forEach((sectionTree) => {
    const parentPath = getParentPath(sectionTree.section.path);

    if (!sectionByPath[parentPath]) return;

    sectionByPath[parentPath].children.push(sectionTree);
  });

  return sectionTrees.filter(({ section }) =>
    path ? section.path === path : isTopLevelPath(section.path)
  );
};
