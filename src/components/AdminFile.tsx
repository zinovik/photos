import React, { useContext } from 'react';
import { FileInterface } from '../types';
import { addUpdatedFile, addRemovedFile, getIsEditModeEnabled } from '../state';
import { ForceUpdateContext } from '../routers/MainRouter';

interface Props {
  file: FileInterface;
}

export const AdminFile = ({ file }: Props) => {
  const forceUpdate = useContext(ForceUpdateContext);

  const { description, text } = file;

  return (
    <>
      {getIsEditModeEnabled() && (
        <>
          <button
            onClick={async () => {
              const newPath = prompt('path', file.path);
              if (newPath === null) return;
              const newDescription = prompt('description', description ?? '');
              if (newDescription === null) return;
              const oldTextString =
                (Array.isArray(text) ? text.join('---') : text) ?? '';
              const newTextString = prompt('text', oldTextString);
              if (newTextString === null) return;
              const newIsTitle = prompt(
                'isTitle',
                String(Boolean(file.isTitle))
              );
              if (newIsTitle === null) return;
              const oldAccessesString = file.accesses
                ? file.accesses.join(',')
                : '';
              const newAccessesString = prompt('accesses', oldAccessesString);
              if (newAccessesString === null) return;

              if (
                newPath === file.path &&
                newDescription === description &&
                newTextString === oldTextString &&
                newIsTitle === String(Boolean(file.isTitle)) &&
                newAccessesString === oldAccessesString
              )
                return;

              addUpdatedFile({
                filename: file.filename,
                ...(newPath === file.path ? {} : { path: newPath }),
                ...(newIsTitle === String(Boolean(file.isTitle))
                  ? {}
                  : { isTitle: newIsTitle === 'true' }),
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
                ...(newAccessesString === oldAccessesString
                  ? {}
                  : {
                      accesses: newAccessesString.split(','),
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
