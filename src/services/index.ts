import { getSections } from './sections';
import { getFiles } from './files';
import { getFileUrls } from './file-urls';
import { SectionWithFiles } from '../types';
import { getDatetimeFromUrl } from './helper';

export const getSectionsWithFiles = async (
  path?: string
): Promise<SectionWithFiles[]> => {
  const [sections, files, fileUrls] = await Promise.all([
    getSections(path),
    getFiles(path),
    getFileUrls(),
  ]);

  return sections.map((section) => ({
    section,
    level: section.path.split('/').length,
    files: files
      .filter((file) => file.path === section.path)
      .map((file) => {
        const url =
          fileUrls.find((url) => url.includes(file.filename)) || file.filename;
        const datetime = getDatetimeFromUrl(url);

        return {
          ...file,
          url,
          description: `${file.description}${
            file.description && datetime && ', '
          }${datetime}`,
        };
      }),
  }));
};
