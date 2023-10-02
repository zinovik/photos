import { SOURCES_CONFIG_URL } from '../constants';
import { FileType } from '../constants';

type SourcesConfig = Record<
  string,
  { url: string; type: FileType } | undefined
>;

let sourcesConfig: SourcesConfig = {};

const loadSourceConfig = async (): Promise<void> => {
  const response = await fetch(SOURCES_CONFIG_URL);

  sourcesConfig = await response.json();
};

export const getSourcesConfig = async (): Promise<SourcesConfig> => {
  if (Object.keys(sourcesConfig).length === 0) {
    await loadSourceConfig();
  }

  return { ...sourcesConfig };
};
