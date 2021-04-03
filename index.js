const fs = require("fs");
const Hjson = require("hjson");
const translate = require("google-translate-free");
const properties = require("properties");

var src = fs.readdirSync("mods");

src.forEach((modFolder) => {
  let modSrc = fs.readdirSync(`mods/${modFolder}`);
});
