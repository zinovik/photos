import React from 'react';

interface Props {
  url: string;
}

export const Video = ({ url }: Props) => {
  return (
    <video width={'100%'} controls>
      <source src={url} type="video/mp4" />
    </video>
  );
};
