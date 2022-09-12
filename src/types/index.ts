import { SectionInterface } from './SectionInterface';
import { FileInterface } from './FileInterface';

export interface SectionWithFiles {
  section: SectionInterface;
  level: number;
  files: FileInterface[];
}

export * from './SectionInterface';
export * from './FileInterface';
export * from './AgendaInterface';
