export const isTopLevelPath = (path: string): boolean => !path.includes("/");

export const isThisOrChildPath = (
  instancePath: string,
  searchPath: string
): boolean => instancePath.indexOf(searchPath) === 0;

export const getParentPath = (path: string): string =>
  path
    .split("/")
    .splice(-1)
    .join("/");
