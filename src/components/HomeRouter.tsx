import React, { useEffect, useState } from 'react';
import { HomePage } from './HomePage';
import { getSectionsWithFiles } from '../services';
import { SectionWithFiles } from '../types';

export const HomeRouter = () => {
  const [sectionsWithFiles, setSectionWithFiles] = useState(
    [] as SectionWithFiles[]
  );

  useEffect(() => {
    getSectionsWithFiles().then((result) => setSectionWithFiles(result));
  }, []);

  return <HomePage sectionsWithFiles={sectionsWithFiles} />;
};
