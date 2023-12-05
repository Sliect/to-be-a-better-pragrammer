// src/cli.ts
var import_utils = require("@umijs/utils");
var args = (0, import_utils.yParser)(process.argv.slice(2), {
  alias: {
    version: ["v", "version"],
    help: ["h", "help"],
    update: ["u", "update"],
    path: ["p", "path"]
  }
});
require("./").default({
  cwd: process.cwd(),
  args
}).catch((err) => {
  console.log(import_utils.chalk.red(err));
});
