import React from 'react';
import { Helmet } from 'react-helmet';
import { SectionWithFiles } from '../types';

interface Props {
  sectionsWithFiles: SectionWithFiles[];
  isHome?: boolean;
}

export const Meta = ({ sectionsWithFiles }: Props) => {
  const image = sectionsWithFiles[0]?.files[0]?.url;

  return (
    <Helmet>
      <meta property="og:type" content="article" />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
};
