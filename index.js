const fs = require("fs");
const Hjson = require("hjson");
const translate = require("google-translate-free");

/**
 * @param {fs.PathLike} path
 * @returns {Object}
 */
function parseContentFile (path=null) {
  if (typeof path != "string") return {};

  let parse = JSON.parse;
  if (path.endsWith(".hjson")) parse = Hjson.parse;

  
}

const CONTENT_TYPE = {
  "items":"item.",
  "blocks":"block.",
  "mechs":"mech.",
  "liquids":"liquid.",
  "units":"unit."
}

var src = fs.readdirSync("mods");

src.forEach((modFolder) => {
  let modSrc = fs.readdirSync(`mods/${modFolder}`);
});
