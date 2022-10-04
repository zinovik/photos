import React, { useEffect, useState } from 'react';
import { Meta } from '../components/Meta';
import { HomePage } from '../pages/HomePage';
import { getSectionsWithFiles } from '../services';
import { SectionWithFiles } from '../types';

export const HomeRouter = () => {
  const [sectionsWithFiles, setSectionWithFiles] = useState(
    [] as SectionWithFiles[]
  );

  useEffect(() => {
    getSectionsWithFiles().then((result) => setSectionWithFiles(result));
  }, []);

  return (
    <>
      <Meta sectionsWithFiles={sectionsWithFiles} isHome />
      <HomePage sectionsWithFiles={sectionsWithFiles} />
    </>
  );
};
