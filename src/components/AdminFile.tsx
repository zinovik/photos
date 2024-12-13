import React, { useContext } from 'react';
import { FileInterface } from '../types';
import {
  addUpdatedFile,
  addRemovedFile,
  getIsEditModeEnabled,
  addSelectedFile,
  removeSelectedFile,
  getSelectedFiles,
} from '../state';
import { ForceUpdateContext } from '../routers/MainRouter';

interface Props {
  file: FileInterface;
}

export const AdminFile = ({ file }: Props) => {
  const forceUpdate = useContext(ForceUpdateContext);

  const { description, text } = file;
  const selectedFiles = getSelectedFiles();

  if (!getIsEditModeEnabled()) {
    return null;
  }

  return (
    <>
      <input
        type="checkbox"
        checked={selectedFiles.includes(file.filename)}
        onChange={(e) => {
          if (e.target.checked) {
            addSelectedFile(file.filename);
          } else {
            removeSelectedFile(file.filename);
          }
          forceUpdate();
        }}
      />
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
          const oldAccessesString = file.accesses
            ? file.accesses.join(',')
            : '';
          const newAccessesString = prompt('accesses', oldAccessesString);
          if (newAccessesString === null) return;

          if (
            newPath === file.path &&
            newDescription === description &&
            newTextString === oldTextString &&
            newAccessesString === oldAccessesString &&
            selectedFiles.length === 0
          )
            return;

          const filenames =
            selectedFiles.length > 0 ? selectedFiles : [file.filename];

          filenames.forEach((filename) =>
            addUpdatedFile({
              filename: filename,
              path: newPath,
              description: newDescription,
              text: newTextString.includes('---')
                ? newTextString.split('---')
                : newTextString,
              accesses: newAccessesString.split(','),
            })
          );
          removeSelectedFile();

          forceUpdate();
        }}
      >
        {selectedFiles.length > 0 ? 'edit selected files' : 'edit file'}
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
  );
};
