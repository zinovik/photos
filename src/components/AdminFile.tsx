import React, { useContext } from 'react';
import { FileInterface } from '../types';
import { isLoggedIn, addUpdatedFile, addRemovedFile } from '../services/api';
import { ForceUpdateContext } from '../routers/MainRouter';

interface Props {
  file: FileInterface;
}

export const AdminFile = ({ file }: Props) => {
  const forceUpdate = useContext(ForceUpdateContext);

  const { description, text } = file;

  return (
    <>
      {isLoggedIn() && (
        <>
          <button
            onClick={() => {
              const newPath = prompt('path', file.path);
              if (newPath === null) return;
              const newDescription = prompt('description', description ?? '');
              if (newDescription === null) return;
              const oldTextString =
                (Array.isArray(text) ? text.join('---') : text) ?? '';
              const newTextString = prompt(
                'text',
                Array.isArray(text) ? text.join('---') : text
              );
              if (newTextString === null) return;

              if (
                newPath === file.path &&
                newDescription === description &&
                newTextString === oldTextString
              )
                return;

              addUpdatedFile({
                filename: file.filename,
                ...(newPath === file.path ? {} : { path: newPath }),
                ...(newDescription === description
                  ? {}
                  : { description: newDescription }),
                ...(newTextString === oldTextString
                  ? {}
                  : {
                      text: newTextString.includes('---')
                        ? newTextString.split('---')
                        : newTextString,
                    }),
              });
              forceUpdate();
            }}
          >
            edit file
          </button>
          <button
            onClick={() => {
              if (!window.confirm(`Remove ${file.filename}?`)) return;

              addRemovedFile({
                filename: file.filename,
              });
              forceUpdate();
            }}
          >
            remove file
          </button>
        </>
      )}
    </>
  );
};
