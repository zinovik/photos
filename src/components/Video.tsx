import React from 'react';

interface Props {
  url: string;
  description: string;
  onClick?: () => void;
}

export const Video = ({ url, description, onClick }: Props) => {
  return (
    <>
      {onClick && (
        <div onClick={onClick} className="link" style={{ textAlign: 'right' }}>
          file link
        </div>
      )}

      <video width={'100%'} controls>
        <source src={url} type="video/mp4" />
      </video>
    </>
  );
};
