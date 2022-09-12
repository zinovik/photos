import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileInterface, SectionInterface, SectionWithFiles } from '../types';
import { FileFullscreen } from './FileFullscreen';
import { getAllFiles, getFilename } from '../services/helper';
import { PARAMETER_NAME } from '../constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  sectionsWithFiles: SectionWithFiles[];
}

export const FilePage = ({ sectionsWithFiles }: Props) => {
  const allFiles = getAllFiles(sectionsWithFiles);

  const [searchParams] = useSearchParams();
  const currentFilename = searchParams.get(PARAMETER_NAME);

  if (allFiles.length === 0) return <>⏳ Loading...</>;

  const currentFileIndex = allFiles.findIndex(
    (file) => getFilename(file.url) === currentFilename
  );

  const filesWithSections: {
    file: FileInterface;
    section: SectionInterface;
  }[] = allFiles.map((file) => ({
    file,
    section: sectionsWithFiles.find((sectionWithFiles) =>
      sectionWithFiles.files.some(
        (sectionFile) => sectionFile.url === allFiles[currentFileIndex].url
      )
    )?.section!, // Each file has a section because we got files from sections
  }));

  return (
    <FileFullscreen
      filesWithSections={filesWithSections}
      currentFileIndex={currentFileIndex}
    />
  );
};
