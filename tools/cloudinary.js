const https = require("https");
const fs = require("fs");
const { exec } = require("child_process");
const { promisify } = require("util");

const API_KEY = process.argv[2];
const API_SECRET = process.argv[3];
const PREFIXES = [
  "gallery/zanzibar",
  "gallery/naliboki",
  "gallery/sakartvelo",
  "gallery/zalessie",
  "gallery/sri-lanka",
  "gallery/uzbekistan",
  "gallery/berlin",
  "gallery/netherlands",
  "gallery/greece",
  "gallery/gigs",
  "gallery/board-games",
];
const SOURCES_CONFIG = "./sources-config.json";

const Authorization = `Basic ${Buffer.from(`${API_KEY}:${API_SECRET}`).toString(
  "base64"
)}`;

const getCloudinaryUrl = (prefix, type, nextCursor) =>
  `https://api.cloudinary.com/v1_1/zinovik/resources/${type}?prefix=${prefix}&type=upload&max_results=500${
    nextCursor ? `&next_cursor=${nextCursor}` : ""
  }`;

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, { headers: { Authorization } }, (res) => {
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () =>
          resolve(JSON.parse(Buffer.concat(data).toString()))
        );
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });

const getFilename = (url) => url.split("/").slice(-1)[0] || "";

const getCloudinaryResources = async (prefix, type) => {
  const resources = [];
  let nextCursor;

  do {
    const response = await request(getCloudinaryUrl(prefix, type, nextCursor));

    resources.push(...response.resources);
    nextCursor = response.next_cursor;
  } while (nextCursor);

  return resources;
};

const getPrefixSources = async (prefix) => {
  const [imageResources, videoResources] = await Promise.all([
    getCloudinaryResources(prefix, "image"),
    getCloudinaryResources(prefix, "video"),
  ]);

  return [...imageResources, ...videoResources]
    .sort((resource1, resource2) =>
      getFilename(resource1.url).localeCompare(getFilename(resource2.url))
    )
    .map((resource) => ({
      url: resource.url.replace("http", "https"),
      type: resource.resource_type,
    }));
};

(async () => {
  console.log("Getting sources...");
  const prefixSources = await Promise.all(
    PREFIXES.map((prefix) => getPrefixSources(prefix))
  );

  PREFIXES.forEach((prefix, index) =>
    console.log(`${prefix}: ${prefixSources[index].length}`)
  );

  const allPrefixSources = prefixSources.reduce(
    (acc, prefixUrls) => [...acc, ...prefixUrls],
    []
  );

  const sourcesConfig = {};
  allPrefixSources.forEach((urlConfig) => {
    sourcesConfig[getFilename(urlConfig.url)] = urlConfig;
  });

  console.log("Writing file...");
  fs.writeFileSync(SOURCES_CONFIG, JSON.stringify(sourcesConfig));
  console.log("Total sources: ", Object.keys(sourcesConfig).length);

  console.log("Formatting file...");
  await promisify(exec)(`npx prettier ${SOURCES_CONFIG} --write`);

  console.log("Done!");
})();
