import React from 'react';

interface Props {
  description?: string;
}

export const ImageDescription = ({ description }: Props) =>
  description ? (
    <p
      style={{
        color: 'darkgray',
        fontSize: '90%',
        marginTop: 0,
        textAlign: 'center',
      }}
    >
      {description}
    </p>
  ) : null;
