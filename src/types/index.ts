import { SectionInterface } from './SectionInterface';
import { FileInterface } from './FileInterface';

export interface SectionWithFiles {
  section: SectionInterface;
  files: FileInterface[];
}

export * from './SectionInterface';
export * from './FileInterface';
export * from './AgendaInterface';
