import React from 'react';
import { Host } from '../constants';

interface Props {
  url: string;
  description: string;
}

export const Video = ({ url, description }: Props) => {
  return url.includes(Host.mega) ? (
    <iframe
      title={description}
      src={url}
      width="800"
      height="600"
      style={{ border: 0 }}
      allowFullScreen
    />
  ) : (
    <video width={'100%'} controls>
      <source src={url} type="video/mp4" />
    </video>
  );
};
