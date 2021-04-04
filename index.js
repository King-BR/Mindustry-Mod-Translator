const fs = require("fs");
const Hjson = require("hjson");
const translate = require("google-translate-free");
const config = require("./config.json");

/**
 *
 * @param {fs.PathLike} path
 * @returns {Object}
 */
function parseContentFile(path = null) {
  if (typeof path != "string" || !fs.existsSync(path)) return false;

  let parse = JSON.parse;
  if (path.endsWith(".hjson")) parse = Hjson.parse;

  return parse(fs.readFileSync(path, { encoding: "utf8" }));
}

/**
 *
 * @param {Number} s - Delay in seconds
 * @returns
 */
function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

const CONTENT_TYPE = {
  items: "item.",
  blocks: "block.",
  mechs: "mech.",
  liquids: "liquid.",
  units: "unit.",
  zones: "zone.",
};

var src = fs.readdirSync("mods");

config.to.forEach(async (lang, l) => {
  let options = {
    from: config.from,
    to: lang,
  };

  src.forEach((modFolder, i) => {
    if (modFolder == ".git") return;
    let contentSrc = fs.readdirSync(`mods/${modFolder}/content`);
    let modMetadata =
      parseContentFile(`mods/${modFolder}/mod.json`) ||
      parseContentFile(`mods/${modFolder}/mod.hjson`);

    if (!fs.existsSync(`mods/${modFolder}/bundles`))
      fs.mkdirSync(`mods/${modFolder}/bundles`);

    let bundleStr = "";

    contentSrc.forEach((contentFolder, j) => {
      let contentFiles = fs.readdirSync(
        `mods/${modFolder}/content/${contentFolder}`
      );

      contentFiles.forEach(async (contentFile, k) => {
        let parsedContentFile = parseContentFile(
          `mods/${modFolder}/content/${contentFolder}/${contentFile}`
        );
        let contentFileName = contentFile.split(".")[0];

        await sleep(i / 2 + j / 2 + k / 2 + l / 2);

        bundleStr += `${CONTENT_TYPE[contentFolder]}.${
          modMetadata.name
        }-${contentFileName}.name = ${
          parsedContentFile.name
            ? translate(parsedContentFile.name, options).text
            : "Oh No"
        }\n${CONTENT_TYPE[contentFolder]}.${
          modMetadata.name
        }-${contentFileName}.description = ${
          parsedContentFile.description
            ? translate(parsedContentFile.description, options).text
            : "Oh No"
        }\n`;
      });
    });

    let bundleFile = `mods/${modFolder}/bundles/bundle.properties`;
    if (lang != "en") {
      bundleFile = `mods/${modFolder}/bundles/bundle_${
        lang.split("-")[0] +
        (lang.split("-")[1].toLowerCase()
          ? "_" + lang.split("-")[1].toUpperCase()
          : "")
      }.properties`;
    }

    fs.writeFileSync(bundleFile, bundleStr, { encoding: "utf8" });
  });
});
