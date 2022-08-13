import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  text: string;
}

export const Markdown = ({ text }: Props) => {
  return <ReactMarkdown>{text}</ReactMarkdown>;
};
