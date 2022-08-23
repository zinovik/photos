import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { AgendaInterface } from '../types';

interface Props {
  agenda: AgendaInterface[];
}

export const Agenda = ({ agenda }: Props) => (
  <div>
    <h2>Agenda</h2>
    {agenda.map(({ title, level, path }) => (
      <p key={path} style={{ paddingLeft: `${level - 1}rem` }}>
        <HashLink to={`#${path}`}>{title}</HashLink>
      </p>
    ))}
  </div>
);
