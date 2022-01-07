const fs = require("fs");
const parseContentFile = require("./parse.js");

/**
 * @param {Number} seconds
 * @returns
 */
function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

/**
 * @param {Function} fn
 * @param {Number} seconds
 */
function delayLoop(fn, seconds) {
  setTimeout(fn, seconds * 1000);
}

const CONTENT_TYPE = {
  items: "item.",
  blocks: "block.",
  mechs: "mech.",
  liquids: "liquid.",
  units: "unit.",
  zones: "zone.",
};

process.on("unhandledRejection", console.log);
