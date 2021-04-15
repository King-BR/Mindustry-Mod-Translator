const fs = require("fs");
const parseContentFile = require("./parse.js");

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

process.on("unhandledRejection", function (err) { console.log(err) })

async function makeBundle () {
  let contentSrc = fs.readdirSync(`mods/content`);
  modName = parseContentFile("mods/mod").name;

  if (!fs.existsSync(`mods/bundles`))
    fs.mkdirSync(`mods/bundles`);


  var contentArr = contentSrc.map(async (contentFolder, j) => {
    let contentFiles = fs.readdirSync(
      `mods/content/${contentFolder}`
    );

    var contentArr2 = contentFiles.map(async (contentFile, k) => {
      let parsedContentFile = await parseContentFile(
        `mods/content/${contentFolder}/${contentFile}`
      );
      let contentFileName = contentFile.split(".")[0];

      //console.log("traduzindo " + contentFile);
      // prettier-ignore
      let str = `${CONTENT_TYPE[contentFolder]}${modName}-${contentFileName}.name = ${parsedContentFile.name? parsedContentFile.name : "Oh No"}\n${CONTENT_TYPE[contentFolder]}${modName}-${contentFileName}.description = ${parsedContentFile.description? parsedContentFile.description : "Oh No"}\n`;
      //console.log(str);
      await sleep((j + k)/2);
      return str;
    });

    return contentArr2;
  });

  let bundleFile = `mods/bundles/bundle_pt_BR.properties`;

  await sleep(20);
  console.log(contentArr.map(async c => { return await c }));
  fs.writeFileSync(bundleFile, contentArr, { encoding: "utf8" });
}

makeBundle();