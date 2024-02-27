import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { getLevel } from '../services/helper';
import { AgendaInterface } from '../types';

interface Props {
  agenda: AgendaInterface[];
}

export const Agenda = ({ agenda }: Props) => {
  const minLevel = agenda.reduce(
    (minLevel, { path }) =>
      minLevel ? Math.min(minLevel, getLevel(path)) : getLevel(path),
    0
  );

  return (
    <div>
      {agenda.map(({ title, path }, index) => (
        <p
          key={path + index}
          style={{ paddingLeft: `${getLevel(path) - minLevel + 1}rem` }}
        >
          <Link to={`/${path}`}>{title}</Link>{' '}
          <HashLink to={`#${path}`}>#</HashLink>
        </p>
      ))}
    </div>
  );
};
