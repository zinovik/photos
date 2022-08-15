import React, { useEffect, useState } from 'react';
import { HomePage } from './HomePage';
import { getSectionsWithImages } from '../services';
import { SectionWithImages } from '../types';

export const HomeRouter = () => {
  const [sectionsWithImages, setSectionWithImages] = useState(
    [] as SectionWithImages[]
  );

  useEffect(() => {
    getSectionsWithImages().then((result) => setSectionWithImages(result));
  }, []);

  return <HomePage sectionsWithImages={sectionsWithImages} />;
};
