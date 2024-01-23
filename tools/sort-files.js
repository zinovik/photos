const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const ALBUMS_FILE = './albums.json';
const FILES_FILE = './files.json';

(async () => {
  const buffers = await Promise.all([
    promisify(fs.readFile)(ALBUMS_FILE),
    promisify(fs.readFile)(FILES_FILE),
  ]);

  const [albums, files] = buffers.map((buffer) =>
    JSON.parse(buffer.toString())
  );

  const albumPaths = albums.map((album) => album.path);

  const filesSorted = [...files].sort((f1, f2) =>
    f1.path.split('/')[0] === f2.path.split('/')[0] // the same root path
      ? f1.filename.localeCompare(f2.filename)
      : albumPaths.indexOf(f1.path) - albumPaths.indexOf(f2.path)
  );

  console.log('Writing file...');
  fs.writeFileSync(FILES_FILE, JSON.stringify(filesSorted));

  console.log('Formatting file...');
  await promisify(exec)(`npx prettier ${FILES_FILE} --write`);

  console.log('Done!');
})();
