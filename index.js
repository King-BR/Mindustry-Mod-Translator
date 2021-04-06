const fs = require("fs");
const parseContentFile = require("./parse.js");
const translate = require('@vitalets/google-translate-api');
translate.languages['pt-br'] = "Portuguese (Brazillian)";

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

src.forEach((modFolder, i) => {
  if (modFolder == ".git") return;
  let contentSrc = fs.readdirSync(`mods/${modFolder}/content`);
  modName = modFolder.toLowerCase();

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

      await sleep(j + k/2);

      console.log("traduzindo " + contentFile)
      // prettier-ignore
      bundleStr += `${CONTENT_TYPE[contentFolder]}${modName}-${contentFileName}.name = ${parsedContentFile.name? await translate(parsedContentFile.name, {from: "en", to: "pt-br" }).text : "Oh No"}\n${CONTENT_TYPE[contentFolder]}${modName}-${contentFileName}.description = ${parsedContentFile.description? await translate(parsedContentFile.description, {from: "en", to: "pt-br" }).text : "Oh No"}\n`;
    });
  });

  let bundleFile = `mods/${modFolder}/bundles/bundle_pt_BR.properties`;

  fs.writeFileSync(bundleFile, bundleStr, { encoding: "utf8" });
});
