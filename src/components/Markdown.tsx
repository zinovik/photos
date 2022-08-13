import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
  text: string;
}

export const Markdown = ({ text }: Props) => {
  return <ReactMarkdown rehypePlugins={[rehypeRaw]} children={text} />;
};
