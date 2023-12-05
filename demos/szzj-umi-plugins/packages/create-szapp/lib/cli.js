// src/cli.ts
var import_utils = require("@umijs/utils");
var args = (0, import_utils.yParser)(process.argv.slice(2), {
  alias: {
    version: ["v"],
    help: ["h"]
  },
  boolean: ["version"]
});
if (args.version && !args._[0]) {
  args._[0] = "version";
  const local = (0, import_utils.isLocalDev)() ? import_utils.chalk.cyan("@local") : "";
  const { name, version } = require("../package.json");
  console.log(`${name}@${version}${local}`);
} else {
  require("./").default({
    cwd: process.cwd(),
    args
  }).catch((err) => {
    console.error(`Create failed, ${err.message}`);
    console.error(err);
  });
}
