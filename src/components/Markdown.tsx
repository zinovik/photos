import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface Props {
  text: string;
}

export const Markdown = ({ text }: Props) => (
  <div style={{ maxWidth: '400' }}>
    <ReactMarkdown rehypePlugins={[rehypeRaw]} children={text} />
  </div>
);
