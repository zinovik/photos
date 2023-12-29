const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const ALBUMS_TO_SORT_BY_ALBUM = [
  "zanzibar",
  "naliboki",
  "sakartvelo",
  "zalessie",
  "sri-lanka",
];
const ALBUMS_TO_SORT_BY_FILENAME = ["uzbekistan", "board-games"];
const ALBUMS_FILE = "./albums.json";
const FILES_FILE = "./files.json";

const isEveryPathEqualsOrChildAnyAlbumInList = (albums, paths) =>
  paths.every((path) => albums.some((album) => path.indexOf(album) === 0));

(async () => {
  const buffers = await Promise.all([
    promisify(fs.readFile)(ALBUMS_FILE),
    promisify(fs.readFile)(FILES_FILE),
  ]);

  const [albums, files] = buffers.map((buffer) =>
    JSON.parse(buffer.toString())
  );

  const albumPaths = albums.map((album) => album.path);

  const filesSorted = [...files].sort((f1, f2) => {
    if (
      isEveryPathEqualsOrChildAnyAlbumInList(ALBUMS_TO_SORT_BY_ALBUM, [
        f1.path,
        f2.path,
      ])
    ) {
      return f1.path === f2.path
        ? (f2.order || 0) - (f1.order || 0)
        : albumPaths.indexOf(f1.path) - albumPaths.indexOf(f2.path);
    }

    if (
      isEveryPathEqualsOrChildAnyAlbumInList(ALBUMS_TO_SORT_BY_FILENAME, [
        f1.path,
        f2.path,
      ])
    ) {
      // the same root album
      if (f1.path.split("/")[0] === f2.path.split("/")[0]) {
        return f1.filename.localeCompare(f2.filename);
      }

      return albumPaths.indexOf(f1.path) - albumPaths.indexOf(f2.path);
    }

    return 0;
  });

  console.log("Writing file...");
  fs.writeFileSync(FILES_FILE, JSON.stringify(filesSorted));

  console.log("Formatting file...");
  await promisify(exec)(`npx prettier ${FILES_FILE} --write`);

  console.log("Done!");
})();
