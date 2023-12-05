var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_utils = require("@umijs/utils");
var import_yargs = __toESM(require("yargs"));
var import_helpers = require("yargs/helpers");
process.on("SIGINT", () => {
  process.kill(process.pid);
});
var argv = (0, import_yargs.default)((0, import_helpers.hideBin)(process.argv)).strict().command({
  command: "version",
  aliases: ["v"],
  describe: "获取版本号",
  handler: () => {
    const local = (0, import_utils.isLocalDev)() ? import_utils.chalk.cyan("@local") : "";
    const { name, version } = require("../package.json");
    console.log(`${name}@${version}${local}`);
  }
}).command({
  command: "irs-build",
  aliases: ["b"],
  describe: "irs打包",
  handler: () => {
    require("./irs/build");
  }
}).command({
  command: "sass2less",
  describe: "将 .scss, .sass 文件转换为 .less 文件",
  builder: (yargs2) => {
    return yargs2.option({}).usage("$0 sass2less");
  },
  handler: (argv2) => {
    require("./transform/sass2less");
  }
}).fail(function(msg, err, yargs2) {
  console.error(yargs2.help());
  console.error("\n\n\n=====命令执行错误，信息如下=====\n\n", msg);
  process.exit(1);
}).help("help", "查看命令行帮助").argv;
var src_default = argv;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
