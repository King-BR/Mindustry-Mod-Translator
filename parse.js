const fs = require("fs");

var nameTest = /(?<!"?weapon"?:\s*{\s*)"?name"?:\s*"?([^\n]+)"?\b/i
var descTest = /"?description"?:\s*"?([\w\S 	.]+)"?\b/i

/**
 *
 * @param {fs.PathLike} path
 * @returns {Object}
 */
module.exports = function (path = null) {
  if (typeof path != "string") return false;

  if(!path.endsWith(".json") && !path.endsWith(".hjson")) {
    if(fs.existsSync(path + ".json")) {
      path += ".json";
    } else if(fs.existsSync(path + ".hjson")) {
      path += ".hjson";
    } else {
      return {};
    }
  }

  if (path.endsWith(".json")) return JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
  if (path.endsWith(".hjson")) {
    let parsedFileContent = {};
    let fileContent = fs.readFileSync(path);

    if(nameTest.test(fileContent)) {
      let nameStr = nameTest.exec(fileContent);
      parsedFileContent.name = nameStr[0].split(":")[1].replace(/"/g, "") || null;
      if (parsedFileContent.name.startsWith(" ")) parsedFileContent.name = parsedFileContent.name.slice(1);
    }

    if(descTest.test(fileContent)) {
      let descStr = descTest.exec(fileContent);
      parsedFileContent.description = descStr[0].split(":")[1].replace(/"/g, "") || null;
      if (parsedFileContent.description.startsWith(" ")) parsedFileContent.description = parsedFileContent.description.slice(1);
    }

    return parsedFileContent;
  }
}