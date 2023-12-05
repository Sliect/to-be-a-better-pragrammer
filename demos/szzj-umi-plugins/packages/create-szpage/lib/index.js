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
var import_creator = __toESM(require("./creator"));
function generatorArgs(args) {
  if (args.version)
    return "version";
  if (args.help)
    return "help";
  if (args.update)
    return "update";
  return void 0;
}
var src_default = async ({ cwd, args }) => {
  const command = generatorArgs(args);
  const creator = new import_creator.default();
  switch (command) {
    case "version":
      const { name, version } = require("../package.json");
      console.log(import_utils.chalk.green(`${name}@${version}`));
      break;
    case "help":
      console.log(`create-szpage             创建模板(当前目录)`);
      console.log(`create-szpage -p path     创建模板(path目录)`);
      console.log(`create-szpage -u          更新本地模板`);
      console.log(`create-szpage -v          查看版本`);
      console.log(`create-szpage -h          帮助`);
      break;
    case "update":
      try {
        await creator.updateTemplate();
      } catch (error) {
        console.log(import_utils.chalk.red(error));
      }
      break;
    default:
      const register = await creator.getTemplateRegister();
      if (register.length > 0) {
        const { store, templateDir } = await creator.chooseTemplate(register);
        try {
          await creator.createTemplate(
            store,
            templateDir,
            cwd,
            typeof args.path === "string" ? args.path : void 0
          );
        } catch (error) {
          console.log(import_utils.chalk.red(error));
        }
      } else {
        console.log(
          import_utils.chalk.yellow("本地暂无模板文件，请执行命令更新模板： create-szpage -u")
        );
      }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
