const fs = require("fs");
const Hjson = require("hjson");
const translate = require("google-translate-free");

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
