import React from 'react';
import { Link } from 'react-router-dom';
import { formatDatetime } from '../utils';
import { PARAMETER_DATE_RANGES } from '../constants';

interface Props {
  dateRanges: string[][] | undefined;
}

export const ShowMode = ({ dateRanges }: Props) => {
  return dateRanges ? (
    <>
      <div>
        <Link to={'?'}>show by albums (default)</Link>
      </div>
      <div style={{ color: 'darkgray' }}>
        {dateRanges
          .map(
            ([from, to]) =>
              `${formatDatetime(from) || 'the very beginning'} - ${
                formatDatetime(to) || 'now'
              }`
          )
          .join(', ')}
      </div>
    </>
  ) : (
    <div>
      <Link to={`?${PARAMETER_DATE_RANGES}=`}>show by date (new on top)</Link>
    </div>
  );
};
