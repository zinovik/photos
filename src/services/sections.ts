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

  return [...loadedSections]
    .filter((section) =>
      path
        ? isThisOrChildPath(section.path, path)
        : isTopLevelPath(section.path)
    )
    .sort((s1, s2) => s2.order - s1.order);
};
