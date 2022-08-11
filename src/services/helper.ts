export const isTopLevelPath = (path: string): boolean => !path.includes("/");

export const isThisOrChildPath = (
  instancePath: string,
  searchPath: string
): boolean => instancePath.indexOf(searchPath) === 0;

export const getParentPath = (path: string): string =>
  path
    .split("/")
    .slice(0, -1)
    .join("/");

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
