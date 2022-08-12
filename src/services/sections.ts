import axios from "axios";
import { isThisOrChildPath, isTopLevelPath } from "./helper";
import { SectionInterface } from "../types";

const SECTIONS_URL = "/data/sections.json";

let loadedSections: SectionInterface[] = [];

const loadSections = async (): Promise<void> => {
  const response = await axios.get<SectionInterface[]>(SECTIONS_URL);

  loadedSections = response.data;
};

export const getSections = async (
  path?: string
): Promise<SectionInterface[]> => {
  if (loadedSections.length === 0) {
    await loadSections();
  }

  const sectionsFiltered = [...loadedSections].filter((section) =>
    path ? isThisOrChildPath(section.path, path) : isTopLevelPath(section.path)
  );

  const orderByPath: { [path: string]: number } = sectionsFiltered.reduce(
    (acc, section) => ({
      ...acc,
      [section.path]: section.order,
    }),
    {}
  );

  return sectionsFiltered.sort((s1, s2): number => {
    const pathParts1 = s1.path.split("/");
    const pathParts2 = s2.path.split("/");

    for (let i = 0; i < Math.min(pathParts1.length, pathParts2.length); i++) {
      if (pathParts1[i] !== pathParts2[i]) {
        const pathCommon = pathParts1.slice(0, i).join("/");
        const path1 = `${pathCommon}/${pathParts1[i]}`;
        const path2 = `${pathCommon}/${pathParts2[i]}`;

        return orderByPath[path1] - orderByPath[path2];
      }
    }

    return pathParts1.length - pathParts2.length;
  });
};
