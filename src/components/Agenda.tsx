import React from 'react';
import { AgendaInterface } from '../types';

interface Props {
  agenda: AgendaInterface[];
}

export const Agenda = ({ agenda }: Props) => (
  <div>
    <p>Agenda</p>
    {agenda.map(({ title, level }) => (
      <p style={{ paddingLeft: `${level - 1}rem` }}>{title}</p>
    ))}
  </div>
);
