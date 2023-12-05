var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/transform/sass2less.ts
var import_lib = __toESM(require("less-plugin-sass2less/lib"));
var import_utils = require("@umijs/utils");
var import_chalk = __toESM(require("chalk"));
var import_path = __toESM(require("path"));
var converter = new import_lib.default();
var SASS_FILE_IN_LESS_PATTERN = /@import \s*['"][^'"]*\.s[c|a]ss['"]/g;
var convertSassImportInLess = () => {
  const cwd = process.cwd();
  const files = import_utils.glob.sync("**/*.less", { cwd });
  files.forEach((file) => {
    const stats = import_utils.fsExtra.statSync(file);
    if (stats.isFile()) {
      const content = import_utils.fsExtra.readFileSync(file, "utf8");
      if (content.match(SASS_FILE_IN_LESS_PATTERN)) {
        const result = content.replace(SASS_FILE_IN_LESS_PATTERN, ($0) => {
          return `${$0.slice(0, $0.length - 5)}less${$0[$0.length - 1]}`;
        });
        import_utils.fsExtra.writeFileSync(file, result);
        console.log(import_chalk.default.green(`${file}文件已将 .sass, .scss 文件导入语句替换成 .less`));
      }
    }
  });
};
convertSassImportInLess();
console.log(import_chalk.default.yellow(`请手动移除 .umirc 文件的 sass 配置`));
